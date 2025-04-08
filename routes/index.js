const express = require('express');
const router = express.Router();

const artworksRouter = require('./artworks');
const searchRouter = require('./search');
const museumsRouter = require('./museums');
const weatherRouter = require('./weather');

// Home page route
router.get('/', async (req, res) => {
    try {
        const featuredArtworks = await req.services.metmuseum.getFeaturedArtworks();
        res.render('index', { featuredArtworks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading featured artworks');
    }
});

// Mount other routers
router.use('/artwork', artworksRouter);
router.use('/search', searchRouter);
router.use('/museum', museumsRouter);
router.use('/weather', weatherRouter);

module.exports = router;