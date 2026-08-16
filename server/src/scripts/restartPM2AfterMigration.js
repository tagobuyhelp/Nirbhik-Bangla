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

async function restartPM2() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== RESTARTING PM2 SERVICES AFTER CLOUDINARY MIGRATION ===\n');

    await runSSHCommand(conn, 'pm2 restart nirbhik-server nirbhik-client');

    console.log('\n=== PM2 SERVICES RESTARTED PERFECTLY! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

restartPM2();
