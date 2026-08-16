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

async function checkLogs() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== CHECKING PM2 PROCESS & LOGS ===\n');

    await runSSHCommand(conn, 'pm2 list');
    console.log('\n--- nirbhik-server logs ---');
    await runSSHCommand(conn, 'pm2 logs nirbhik-server --lines 30 --nostream');

    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

checkLogs();
