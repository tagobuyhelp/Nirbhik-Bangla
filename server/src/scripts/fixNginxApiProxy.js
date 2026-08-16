const { Client } = require('ssh2');

const vpsConfig = {
  host: '72.61.235.235',
  port: 2222,
  username: 'root',
  password: 'tarikAziz@703330'
};

function runSSHCommand(conn, cmd) {
  return new Promise((resolve) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return resolve('');
      let output = '';
      stream.on('close', () => resolve(output))
        .on('data', (d) => { output += d; process.stdout.write(d); })
        .stderr.on('data', (d) => { output += d; process.stderr.write(d); });
    });
  });
}

async function fixNginx() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== FIXING NGINX API PROXY PASS FOR nirbhikbangla.com ===\n');

    const nginxConfig = `server {
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
        proxy_pass http://127.0.0.1:5050;
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
        proxy_pass http://127.0.0.1:5050;
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

    await runSSHCommand(conn, `echo '${nginxConfig}' > /etc/nginx/sites-available/nirbhikbangla.com.conf`);
    await runSSHCommand(conn, 'nginx -t && systemctl reload nginx');

    console.log('\n=== NGINX API PROXY PASS FIXED! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

fixNginx();
