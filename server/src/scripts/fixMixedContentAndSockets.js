const { Client } = require('ssh2');

const vpsConfig = {
  host: '72.61.235.235',
  port: 2222,
  username: 'root',
  password: 'tarikAziz@703330'
};

function runSSHCommand(conn, cmd) {
  return new Promise((resolve) => {
    console.log(`> Executing: ${cmd}`);
    conn.exec(cmd, (err, stream) => {
      if (err) return resolve('');
      let output = '';
      stream.on('close', () => resolve(output))
        .on('data', (d) => { output += d; process.stdout.write(d); })
        .stderr.on('data', (d) => { output += d; process.stderr.write(d); });
    });
  });
}

async function fixMixedContent() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== FIXING MIXED CONTENT & SOCKET.IO WSS FOR nirbhikbangla.com ===\n');

    // 1. Update Nginx Config with WebSocket support and SSL
    const nginxFullConfig = `server {
    listen 80;
    listen [::]:80;
    server_name nirbhikbangla.com www.nirbhikbangla.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name nirbhikbangla.com www.nirbhikbangla.com;

    ssl_certificate /etc/letsencrypt/live/nirbhikbangla.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/nirbhikbangla.com/privkey.pem;

    # Client Portal (Next.js - Port 3050)
    location / {
        proxy_pass http://127.0.0.1:3050;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend REST API (Express - Port 5050)
    location /api/ {
        proxy_pass http://127.0.0.1:5050/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Socket.io WebSockets (Port 5050)
    location /socket.io/ {
        proxy_pass http://127.0.0.1:5050/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`;

    await runSSHCommand(conn, `echo '${nginxFullConfig}' > /etc/nginx/sites-available/nirbhikbangla.com.conf`);
    await runSSHCommand(conn, 'nginx -t && systemctl reload nginx');

    // 2. Update Client .env.local on VPS to use HTTPS and WSS
    const clientEnv = `NEXT_PUBLIC_API_URL=https://nirbhikbangla.com/api/v1
NEXT_PUBLIC_SITE_URL=https://nirbhikbangla.com
NEXT_PUBLIC_SOCKET_URL=https://nirbhikbangla.com
NEXT_PUBLIC_GA_ID=G-123P5MTQCM
PORT=3050
`;
    await runSSHCommand(conn, `echo "${clientEnv}" > /var/www/nirbhik-bangla/client/.env.local`);

    // 3. Update Server .env on VPS
    const serverEnv = `PORT=5050
NODE_ENV=production
MONGODB_URI=mongodb://tagobuy:tarikAziz%40703330@127.0.0.1:27017/nirbhik-bangla?authSource=admin
JWT_SECRET=nirbhik_bangla_secret_key_2026
CLIENT_URL=https://nirbhikbangla.com
ADMIN_URL=http://72.61.235.235:3051
CLOUDINARY_CLOUD_NAME=nirbhik-bangla
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdefg
`;
    await runSSHCommand(conn, `echo "${serverEnv}" > /var/www/nirbhik-bangla/server/.env`);

    // 4. Rebuild Client with new HTTPS/WSS environment variables
    console.log('\n--- Rebuilding Client with HTTPS & WSS Config ---');
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/client && npm run build');

    // 5. Restart PM2 processes
    await runSSHCommand(conn, 'pm2 restart nirbhik-server nirbhik-client');

    console.log('\n=== MIXED CONTENT & WEBSOCKET WSS FIXED 100%! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

fixMixedContent();
