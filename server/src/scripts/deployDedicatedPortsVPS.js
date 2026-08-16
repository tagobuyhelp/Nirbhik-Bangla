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

async function deployDedicated() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== DEPLOYING NIRBHIK BANGLA ON DEDICATED FREE PORTS (3050, 3051, 5050) ===\n');

    // 1. Restore original Nginx default symlink if modified
    await runSSHCommand(conn, 'rm -f /etc/nginx/sites-enabled/default');
    await runSSHCommand(conn, 'if [ -f "/etc/nginx/sites-available/default" ]; then ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default; fi');

    // 2. Stop old PM2 nirbhik instances if any
    await runSSHCommand(conn, 'pm2 delete nirbhik-server nirbhik-client nirbhik-admin || true');

    // 3. Update server .env with PORT=5050
    const serverEnv = `PORT=5050
NODE_ENV=production
MONGODB_URI=mongodb://tagobuy:tarikAziz%40703330@127.0.0.1:27017/nirbhik-bangla?authSource=admin
JWT_SECRET=nirbhik_bangla_secret_key_2026
CLIENT_URL=http://72.61.235.235:3050
ADMIN_URL=http://72.61.235.235:3051
CLOUDINARY_CLOUD_NAME=nirbhik-bangla
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdefg
`;
    await runSSHCommand(conn, `echo "${serverEnv}" > /var/www/nirbhik-bangla/server/.env`);

    // 4. Update client .env.local with API URL port 5050
    const clientEnv = `NEXT_PUBLIC_API_URL=http://72.61.235.235:5050/api/v1
NEXT_PUBLIC_SITE_URL=http://72.61.235.235:3050
NEXT_PUBLIC_SOCKET_URL=http://72.61.235.235:5050
PORT=3050
`;
    await runSSHCommand(conn, `echo "${clientEnv}" > /var/www/nirbhik-bangla/client/.env.local`);

    // 5. Rebuild client with new env vars
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/client && npm run build');

    // 6. UFW Firewall Allow Ports 3050, 3051, 5050
    await runSSHCommand(conn, 'ufw allow 3050/tcp');
    await runSSHCommand(conn, 'ufw allow 3051/tcp');
    await runSSHCommand(conn, 'ufw allow 5050/tcp');

    // 7. Start PM2 instances on dedicated ports
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/server && pm2 start src/index.js --name "nirbhik-server"');
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/client && pm2 start npm --name "nirbhik-client" -- start -- -p 3050');
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/admin && pm2 start npx --name "nirbhik-admin" -- serve -s dist -l 3051');

    await runSSHCommand(conn, 'pm2 save');

    // 8. Test Nginx and reload
    await runSSHCommand(conn, 'nginx -t && systemctl reload nginx');

    console.log('\n=== DEPLOYMENT ON DEDICATED PORTS (3050, 3051, 5050) COMPLETE! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

deployDedicated();
