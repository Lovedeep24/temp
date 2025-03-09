const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { scheduleCreditReset } = require('./utils/scheduleCreditReset');
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "*/*", limit: "5mb" }));
app.use(routes);
app.listen(3000, () => {
    console.log('Listening on 3000');
    scheduleCreditReset();
});
