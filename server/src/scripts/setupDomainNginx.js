const { Client } = require('ssh2');
const dns = require('dns').promises;

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

async function setupDomain() {
  console.log('=== CHECKING DNS FOR nirbhikbangla.com ===');
  try {
    const addresses = await dns.resolve4('nirbhikbangla.com');
    console.log('nirbhikbangla.com A records:', addresses);
  } catch (err) {
    console.log('DNS Resolution info:', err.message);
  }

  const conn = new Client();
  conn.on('ready', async () => {
    console.log('\n=== CONFIGURING NGINX FOR nirbhikbangla.com ===\n');

    const nginxDomainConfig = `server {
    listen 80;
    listen [::]:80;
    server_name nirbhikbangla.com www.nirbhikbangla.com;

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

    # Backend API (Express - Port 5050)
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
}
`;

    // 1. Save domain nginx config file
    await runSSHCommand(conn, `echo '${nginxDomainConfig}' > /etc/nginx/sites-available/nirbhikbangla.com.conf`);
    await runSSHCommand(conn, 'ln -sf /etc/nginx/sites-available/nirbhikbangla.com.conf /etc/nginx/sites-enabled/nirbhikbangla.com.conf');

    // 2. Test and reload Nginx
    await runSSHCommand(conn, 'nginx -t && systemctl reload nginx');

    // 3. Check if certbot is installed and try obtaining SSL certificate
    console.log('\n--- Checking Certbot SSL Status ---');
    const certbotStatus = await runSSHCommand(conn, 'which certbot || echo "not_found"');

    if (!certbotStatus.includes('not_found')) {
      console.log('\n--- Attempting SSL Certificate Issue via Certbot ---');
      await runSSHCommand(conn, 'certbot --nginx -d nirbhikbangla.com -d www.nirbhikbangla.com --non-interactive --agree-tos --email contact@nirbhikbangla.com --redirect || true');
    }

    console.log('\n=== DOMAIN CONFIGURATION FOR nirbhikbangla.com COMPLETE! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

setupDomain();
