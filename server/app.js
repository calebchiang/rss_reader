const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE_URI;

main().catch((err) => console.log(err));
async function main(){
    await mongoose.connect(mongoDB);
}

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

