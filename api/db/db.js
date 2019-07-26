const mongoose = require('mongoose');
const readLine = require('readline');
require("../posts/post.schema");

const dbURL = process.env.DB_URL;
const connectOption = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    auth: { authSource: process.env.DB_AUTH_SOURCE }
};

mongoose.connection.on('connected', () => {
    console.log('connected');
});

mongoose.connection.on('error', err => {
    console.log('error: ' + err);
    return connect();
});

mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
});

if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    });
};

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

const connect = () => {
    console.log("dbURL:" + dbURL);
    setTimeout(() => mongoose.connect(dbURL, connectOption), 1000);
};

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

module.exports = { connect };


