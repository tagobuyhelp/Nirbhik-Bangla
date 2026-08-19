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

async function deployPush() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('=== DEPLOYING WEB PUSH NOTIFICATION UPDATES TO VPS ===\n');

    // 1. Git pull
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla && git pull origin main');

    // 2. Add VAPID keys to server/.env on VPS
    require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
    const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY || '';
    const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET || '';

    const serverEnv = `PORT=5050
NODE_ENV=production
MONGODB_URI=mongodb://tagobuy:tarikAziz%40703330@127.0.0.1:27017/nirbhik-bangla?authSource=admin
JWT_SECRET=nirbhik_bangla_secret_key_2026
CLIENT_URL=https://nirbhikbangla.com
ADMIN_URL=http://72.61.235.235:3051
CLOUDINARY_CLOUD_NAME=${cloudinaryCloudName}
CLOUDINARY_API_KEY=${cloudinaryApiKey}
CLOUDINARY_API_SECRET=${cloudinaryApiSecret}
VAPID_PUBLIC_KEY=BFUAijMPyigTPURf6oyJa9aQ3ublhlHdveqWgGC81YPbTEuY5V8A8HGKliWleYwZ_RgCQDJw27CRe2lXKsxHXyg
VAPID_PRIVATE_KEY=pGcjF060eEIbfo6bIX9dQzanfScPaH3IsqTpwryCpmw
VAPID_SUBJECT=mailto:contact@nirbhikbangla.com
AI_PROVIDER=gemini
GEMINI_API_KEY=${geminiKey}
AI_MODEL_PRIMARY=gemini-2.5-flash
`;
    await runSSHCommand(conn, `echo "${serverEnv}" > /var/www/nirbhik-bangla/server/.env`);

    // 3. NPM install & restart PM2
    await runSSHCommand(conn, 'cd /var/www/nirbhik-bangla/server && npm install --production');
    await runSSHCommand(conn, 'pm2 restart nirbhik-server nirbhik-client');

    console.log('\n=== VPS WEB PUSH NOTIFICATIONS DEPLOYED SUCCESSFULLY! ===');
    conn.end();
    process.exit(0);
  }).connect(vpsConfig);
}

deployPush();
