const express = require('express');
require('dotenv').config({path: 'backend/.env'});
const cors = require('cors')
const app = express();
let port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
require('./database/db');
console.log("blogapp connected");

app.use('/api', require('./routes/indexRoute'))
console.log("blogapp route");

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})


