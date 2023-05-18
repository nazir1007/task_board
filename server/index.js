const express = require("express");
const port = 8080;
const app = express();
const cors = require("cors");
const db = require('./config/mongoose');

app.use(express.json())
app.use(express.urlencoded())
app.use(cors());

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
})