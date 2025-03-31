const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/firebase');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Test Firestore connection
app.get('/', async (req, res) => {
    try {
        const testDoc = await db.collection('test').doc('testDoc').set({ status: "Firebase connected!" });
        res.send('Firebase connection successful! Test document created.');
    } catch (error) {
        res.status(500).send('Firebase connection failed: ' + error.message);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
