const mongoose = require('mongoose');
const { logger } = require('../config/logModule');

mongoose.Promise = global.Promise;

const connect = () => {
    console.log('[LOG=DB] mongoose.connect BEFORE...');
    mongoose.connect(
        process.env.DATABASE_URL,
        { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
        err => {
            console.log('[LOG=DB] mongoose.connect CALLBACK NODE_ENV:', process.env.NODE_ENV);
            console.log('[LOG=DB] mongoose.connect CALLBACK err:', err);
            if (err) {
                logger.error(err);
                return;
            }

            if (process.env.NODE_ENV !== 'test') {
                logger.info('[LOG=DB] Successfully connected to MongoDB');
            }
        }
    );
    console.log('mongoose.connect AFTER...');
};

connect();

module.exports = { mongoose, connect };
