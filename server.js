const express = require('express');
const path = require('path');
require('dotenv').config();

const recipeRoutes = require('./routes/recipeRoutes');
const pantryRoutes = require('./routes/pantryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/recipes', recipeRoutes);
app.use('/api/pantry', pantryRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server Cook2Go berjalan sempurna di http://localhost:${PORT}`);
});