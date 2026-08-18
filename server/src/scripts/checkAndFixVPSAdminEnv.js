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

async function fixVPSAdmin() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== UPDATING AND BUILDING VPS ADMIN PANEL WITH PRODUCTION API URL ===\n');

    const adminEnv = `VITE_API_URL=https://nirbhikbangla.com/api/v1
VITE_PUBLIC_SITE_URL=https://nirbhikbangla.com
`;

    await runSSHCommand(conn, `echo "${adminEnv}" > /var/www/nirbhik-bangla/admin/.env`);
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/admin && npm run build');
    await runSSHCommand(conn, 'pm2 restart nirbhik-admin');

    console.log('\n=== VPS ADMIN PANEL REBUILT & DEPLOYED SUCCESSFULLY! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

fixVPSAdmin();
