const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db');
const tasksRoute = require('./routes/tasks');
require('./models/task'); // register model

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', tasksRoute);

const PORT = process.env.PORT || 4000;

async function start() {
    await sequelize.authenticate();
    await sequelize.sync(); // sync (safe for dev)
    app.listen(PORT, () => console.log(`Server listening ${PORT}`));
}

start().catch(err => {
    console.error('Failed to start', err);
    process.exit(1);
});

module.exports = app;