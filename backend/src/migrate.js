const fs = require('fs');
const path = require('path');
const sequelize = require('./db');

async function run() {
    const sql = fs.readFileSync(path.join(__dirname, '../migrations/001-create-task.sql'), 'utf8');
    await sequelize.query(sql);
    console.log('Migration applied');
    process.exit(0);
}

run().catch(e => { console.error(e);
    process.exit(1); });