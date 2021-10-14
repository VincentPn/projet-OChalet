require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const rateLimit = require('express-rate-limit');
const docs = require('./docs/swagger');
require('./app/services/scheduledTasks')

const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use(limiter);

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));


app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}\nApi docs available on http://localhost:${port}/api-docs`)
});




