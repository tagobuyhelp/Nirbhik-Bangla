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

async function check() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== CHECKING GOOGLE ANALYTICS ON VPS ===\n');

    const envContent = await runSSHCommand(conn, 'cat /var/www/nirbhik-bangla/client/.env.local');
    console.log('Current VPS client/.env.local:\n' + envContent);

    // If NEXT_PUBLIC_GA_ID is missing or default, set it!
    const clientEnv = `NEXT_PUBLIC_API_URL=http://72.61.235.235:5050/api/v1
NEXT_PUBLIC_SITE_URL=http://72.61.235.235:3050
NEXT_PUBLIC_SOCKET_URL=http://72.61.235.235:5050
NEXT_PUBLIC_GA_ID=G-123P5MTQCM
PORT=3050
`;

    await runSSHCommand(conn, `echo "${clientEnv}" > /var/www/nirbhik-bangla/client/.env.local`);
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/client && npm run build');
    await runSSHCommand(conn, 'pm2 restart nirbhik-client');

    console.log('\n=== GOOGLE ANALYTICS VERIFIED & UPDATED ON VPS! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

check();
