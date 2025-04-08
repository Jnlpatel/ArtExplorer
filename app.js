require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Services setup
const services = {
    metmuseum: require('./services/metMuseum'),
    openstreetmap: require('./services/openstreetmap')
};

// Add services to request object
app.use((req, res, next) => {
    req.services = services;
    next();
});

// Routes
const indexRouter = require('./routes');
app.use('/', indexRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handling
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});