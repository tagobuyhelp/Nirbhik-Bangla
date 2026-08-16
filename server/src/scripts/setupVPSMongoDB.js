const mongoose = require('mongoose');
require('dotenv').config();

const localURI = 'mongodb://localhost:27017/nirbhik-bangla';
const vpsURI = 'mongodb://tagobuy:tarikAziz%40703330@72.61.235.235:27017/nirbhik-bangla?authSource=admin';

async function migrateToVPSMongo() {
  try {
    console.log('Connecting to Local MongoDB...');
    const localConn = await mongoose.createConnection(localURI).asPromise();
    console.log('Connected to Local MongoDB!');

    console.log('\nConnecting to VPS MongoDB (72.61.235.235:27017)...');
    const vpsConn = await mongoose.createConnection(vpsURI).asPromise();
    console.log('Connected to VPS MongoDB!');

    const collections = await localConn.db.listCollections().toArray();
    console.log(`\nFound ${collections.length} collections locally to migrate to VPS:`);

    for (const colInfo of collections) {
      const colName = colInfo.name;
      console.log(`\nMigrating collection: "${colName}"...`);

      const localDocs = await localConn.db.collection(colName).find({}).toArray();
      console.log(`- Local documents count: ${localDocs.length}`);

      if (localDocs.length > 0) {
        // Clear existing VPS collection
        await vpsConn.db.collection(colName).deleteMany({});
        // Insert all local docs
        await vpsConn.db.collection(colName).insertMany(localDocs);
        console.log(`- Successfully migrated ${localDocs.length} documents to VPS database!`);
      } else {
        console.log(`- Collection is empty, skipping.`);
      }
    }

    console.log('\n=== VPS MONGODB SETUP & DATA MIGRATION COMPLETE! ===');

    await localConn.close();
    await vpsConn.close();
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateToVPSMongo();
