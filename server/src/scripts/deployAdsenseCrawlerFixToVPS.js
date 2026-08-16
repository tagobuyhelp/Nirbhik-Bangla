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

async function deployFix() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== DEPLOYING ADSENSE CRAWLER VERIFICATION FIX TO VPS ===\n');

    // 1. Git pull
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla && git pull origin main');

    // 2. Build Client
    console.log('\n--- Rebuilding Client ---');
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/client && npm run build');

    // 3. Restart PM2 client
    await runSSHCommand(conn, 'pm2 restart nirbhik-client');

    console.log('\n=== VPS DEPLOYMENT COMPLETE! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

deployFix();
