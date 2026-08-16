const { Client } = require('ssh2');

const conn = new Client();

const vpsConfig = {
  host: '72.61.235.235',
  port: 2222,
  username: 'root',
  password: 'tarikAziz@703330'
};

function runSSHCommand(cmd) {
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

conn.on('ready', async () => {
  console.log('=== CONFIGURING VPS FIREWALL & NGINX FOR 100% PUBLIC ACCESS ===\n');

  // 1. UFW Firewall Allow Ports 80, 3000, 3001, 5000, 2222
  await runSSHCommand('ufw allow 80/tcp');
  await runSSHCommand('ufw allow 3000/tcp');
  await runSSHCommand('ufw allow 3001/tcp');
  await runSSHCommand('ufw allow 5000/tcp');
  await runSSHCommand('ufw allow 2222/tcp');

  // 2. Setup Nginx reverse proxy config on Port 80
  const nginxConfig = `
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    # Client News Portal (Next.js)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Admin Panel
    location /admin/ {
        proxy_pass http://127.0.0.1:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
`;

  await runSSHCommand(`echo '${nginxConfig}' > /etc/nginx/sites-available/nirbhik-bangla`);
  await runSSHCommand('ln -sf /etc/nginx/sites-available/nirbhik-bangla /etc/nginx/sites-enabled/default');
  await runSSHCommand('nginx -t && systemctl reload nginx');

  console.log('\n=== FIREWALL & NGINX REVERSE PROXY CONFIGURED! ===');
  conn.end();
  process.exit(0);
}).connect(vpsConfig);
