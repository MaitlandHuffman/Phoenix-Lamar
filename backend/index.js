const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Authentication Routes
app.use('/api', require('./routes/auth'));
app.use('/api/parts', require('./routes/parts'));

// (You can add more route modules here in the future)

// Default route
app.get('/', (req, res) => {
    res.send('Phoenix Lamar Backend is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
