const mongoose = require('mongoose'); // also fixed: 'mongose' → 'mongoose'
const dotenv = require("dotenv");
dotenv.config();
const database_uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-ps5frwr-shard-00-00.eeuwpud.mongodb.net:27017,ac-ps5frwr-shard-00-01.eeuwpud.mongodb.net:27017,ac-ps5frwr-shard-00-02.eeuwpud.mongodb.net:27017/?ssl=true&replicaSet=atlas-s3a9u3-shard-0&authSource=admin&appName=react-node`;
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(database_uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log('Error:', err);
    }
}

module.exports = connectDb;