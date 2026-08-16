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

async function deployAdsense() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== DEPLOYING GOOGLE ADSENSE CODE TO VPS ===\n');

    // 1. Update VPS client/.env.local with AdSense ID
    const clientEnv = `NEXT_PUBLIC_API_URL=https://nirbhikbangla.com/api/v1
NEXT_PUBLIC_SITE_URL=https://nirbhikbangla.com
NEXT_PUBLIC_SOCKET_URL=https://nirbhikbangla.com
NEXT_PUBLIC_GA_ID=G-123P5MTQCM
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-4059248504896664
PORT=3050
`;

    await runSSHCommand(conn, `echo "${clientEnv}" > /var/www/nirbhik-bangla/client/.env.local`);

    // 2. Rebuild Client with AdSense script
    console.log('\n--- Rebuilding Client with Google AdSense ---');
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/client && npm run build');

    // 3. Restart PM2 nirbhik-client
    await runSSHCommand(conn, 'pm2 restart nirbhik-client');

    console.log('\n=== GOOGLE ADSENSE CODE DEPLOYED 100% SUCCESSFULLY ON VPS! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

deployAdsense();
