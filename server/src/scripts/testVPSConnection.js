const { Client } = require('ssh2');

const conn = new Client();

const vpsConfig = {
  host: '72.61.235.235',
  port: 2222,
  username: 'root',
  password: 'tarikAziz@703330'
};

conn.on('ready', () => {
  console.log('=== SSH CONNECTION TO VPS SUCCESSFUL! ===\n');

  conn.exec('uname -a && node -v && npm -v && pm2 -v', (err, stream) => {
    if (err) throw err;
    let output = '';
    stream.on('close', (code, signal) => {
      console.log('Command output:\n' + output);
      conn.end();
      process.exit(0);
    }).on('data', (data) => {
      output += data;
    }).stderr.on('data', (data) => {
      output += data;
    });
  });
}).on('error', (err) => {
  console.error('=== SSH CONNECTION ERROR ===:', err.message);
  process.exit(1);
}).connect(vpsConfig);
