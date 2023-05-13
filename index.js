const connectToDatabase = require('./database/connectToDatabase');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;


async function handler(req, res) {
    // Connect to the database
    await connectToDatabase()

    // Perform database operations
    // ...
}

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.get('/test-db', async (req, res) => {
    try {
        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = process.env.MONGODB_DB;//client.db('my-database');
        const collection = database.collection('users');
        const data = await collection.find().toArray();
        await client.close();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while connecting to the database.');
    }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
