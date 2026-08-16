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

async function setupAdminDomain() {
  console.log('=== CHECKING DNS FOR admin.nirbhikbangla.com ===\n');
  let dnsOk = false;
  try {
    const addresses = await dns.resolve4('admin.nirbhikbangla.com');
    console.log('admin.nirbhikbangla.com A records:', addresses);
    if (addresses.includes('72.61.235.235')) {
      dnsOk = true;
    }
  } catch (err) {
    console.log('DNS Lookup:', err.message);
  }

  const conn = new Client();
  conn.on('ready', async () => {
    console.log('\n=== CONFIGURING NGINX FOR admin.nirbhikbangla.com ===\n');

    const adminNginxConfig = `server {
    listen 80;
    listen [::]:80;
    server_name admin.nirbhikbangla.com;

    # Admin Panel (Port 3051)
    location / {
        proxy_pass http://127.0.0.1:3051;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API Proxy (Port 5050)
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
}
`;

    await runSSHCommand(conn, `echo '${adminNginxConfig}' > /etc/nginx/sites-available/admin.nirbhikbangla.com.conf`);
    await runSSHCommand(conn, 'ln -sf /etc/nginx/sites-available/admin.nirbhikbangla.com.conf /etc/nginx/sites-enabled/admin.nirbhikbangla.com.conf');
    await runSSHCommand(conn, 'nginx -t && systemctl reload nginx');

    console.log('\n--- Checking Certbot SSL for admin.nirbhikbangla.com ---');
    await runSSHCommand(conn, 'certbot --nginx -d admin.nirbhikbangla.com --non-interactive --agree-tos --email contact@nirbhikbangla.com --redirect || true');

    console.log('\n=== NGINX & SSL CONFIGURATION FOR admin.nirbhikbangla.com COMPLETE! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

setupAdminDomain();
