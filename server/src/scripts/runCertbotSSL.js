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

async function runSSL() {
  console.log('=== CHECKING DNS PROPAGATION FOR nirbhikbangla.com ===\n');

  try {
    const addresses = await dns.resolve4('nirbhikbangla.com');
    console.log('nirbhikbangla.com A records:', addresses);

    if (!addresses.includes('72.61.235.235')) {
      console.log('\n[DNS Status]: Domain A-record is not pointing to 72.61.235.235 yet.');
      console.log('Currently resolves to:', addresses.join(', '));
      console.log('We will continuously attempt SSL issuing on VPS.');
    } else {
      console.log('\n[DNS Status]: Domain A-record is properly pointing to 72.61.235.235! 🎉');
    }
  } catch (err) {
    console.log('DNS Lookup:', err.message);
  }

  const conn = new Client();
  conn.on('ready', async () => {
    console.log('\n=== ISSUING CERTBOT SSL CERTIFICATE ON VPS ===\n');

    await runSSHCommand(conn, 'certbot --nginx -d nirbhikbangla.com -d www.nirbhikbangla.com --non-interactive --agree-tos --email contact@nirbhikbangla.com --redirect');

    console.log('\n=== CERTBOT SSL PROCESS EXECUTED! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

runSSL();
