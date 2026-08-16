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
        .on('data', (d) => { output += d; })
        .stderr.on('data', (d) => { output += d; });
    });
  });
}

async function audit() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== AUDITING ALL VPS PORTS, PM2 PROCESSES, & NGINX SITES ===\n');

    // 1. Check Listening Ports
    const listeningPorts = await runSSHCommand(conn, 'ss -tulpn | grep LISTEN');
    console.log('--- Active Listening Ports ---');
    console.log(listeningPorts);

    // 2. Check PM2 List
    const pm2List = await runSSHCommand(conn, 'pm2 list');
    console.log('--- PM2 Running Processes ---');
    console.log(pm2List);

    // 3. List Nginx Sites Enabled
    const nginxSites = await runSSHCommand(conn, 'ls -la /etc/nginx/sites-enabled/');
    console.log('--- Nginx Sites Enabled ---');
    console.log(nginxSites);

    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

audit();
