const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
app.use(cors());
mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE_URI;
app.use(express.json());

async function main() {
    await mongoose.connect(mongoDB);
    const db = mongoose.connection;

    db.once('open', function () {
        console.log('Mongoose connection successfully opened to', mongoDB);
    });

    db.on('error', function (err) {
        console.error('Mongoose connection error:', err);
    });

    db.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
    });

    process.on('SIGINT', function () {
        db.close(function () {
            console.log('Mongoose connection disconnected through app termination');
            process.exit(0);
        });
    });
}


main().catch((err) => console.log(err));



app.get('/', (req, res) => {
    res.send('Welcome to the RSS Reader API!');
});


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const subscriptionRoutes = require('./routes/subscription');
app.use('/api/add-subscriptions', subscriptionRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

