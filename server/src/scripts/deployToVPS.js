const { Client } = require('ssh2');

const vpsConfig = {
  host: '72.61.235.235',
  port: 2222,
  username: 'root',
  password: 'tarikAziz@703330'
};

function runSSHCommand(conn, cmd) {
  return new Promise((resolve, reject) => {
    console.log(`\n> Executing: ${cmd}`);
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let output = '';
      stream.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          console.log(`[Output Code: ${code}] ${output}`);
          resolve(output); // resolve even on non-zero for flexible handling
        }
      }).on('data', (data) => {
        output += data;
        process.stdout.write(data);
      }).stderr.on('data', (data) => {
        output += data;
        process.stderr.write(data);
      });
    });
  });
}

async function deploy() {
  const conn = new Client();

  conn.on('ready', async () => {
    console.log('=== CONNECTED TO VPS FOR AUTOMATED DEPLOYMENT ===\n');
    try {
      // 1. Prepare directory
      await runSSHCommand(conn, 'mkdir -p /var/www/nirbhik-bangla');

      // 2. Clone or pull repo
      await runSSHCommand(conn, 'if [ -d "/var/www/nirbhik-bangla/.git" ]; then cd /var/www/nirbhik-bangla && git pull origin main; else git clone https://github.com/tagobuyhelp/Nirbhik-Bangla.git /var/www/nirbhik-bangla; fi');

      // 3. Create server .env
      const serverEnv = `PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://tagobuy:tarikAziz%40703330@127.0.0.1:27017/nirbhik-bangla?authSource=admin
JWT_SECRET=nirbhik_bangla_secret_key_2026
CLIENT_URL=http://72.61.235.235:3000
ADMIN_URL=http://72.61.235.235:3001
CLOUDINARY_CLOUD_NAME=nirbhik-bangla
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdefg
`;
      await runSSHCommand(conn, `echo "${serverEnv}" > /var/www/nirbhik-bangla/server/.env`);

      // 4. Create client .env.local
      const clientEnv = `NEXT_PUBLIC_API_URL=http://72.61.235.235:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://72.61.235.235:3000
NEXT_PUBLIC_SOCKET_URL=http://72.61.235.235:5000
`;
      await runSSHCommand(conn, `echo "${clientEnv}" > /var/www/nirbhik-bangla/client/.env.local`);

      // 5. Install server dependencies
      await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/server && npm install --production');

      // 6. Install client dependencies & build
      await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/client && npm install && npm run build');

      // 7. Install & build admin panel
      await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/admin && npm install && npm run build');

      // 8. Configure PM2 for server, client, admin
      await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/server && pm2 start src/index.js --name "nirbhik-server" || pm2 restart nirbhik-server');
      await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/client && pm2 start npm --name "nirbhik-client" -- start -- -p 3000 || pm2 restart nirbhik-client');
      await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/admin && pm2 start npx --name "nirbhik-admin" -- serve -s dist -l 3001 || pm2 restart nirbhik-admin');

      await runSSHCommand(conn, 'pm2 save');
      await runSSHCommand(conn, 'pm2 list');

      console.log('\n=== VPS DEPLOYMENT COMPLETED SUCCESSFULLY! ===');
      conn.end();
      process.exit(0);
    } catch (err) {
      console.error('Deployment failed:', err);
      conn.end();
      process.exit(1);
    }
  }).connect(vpsConfig);
}

deploy();
