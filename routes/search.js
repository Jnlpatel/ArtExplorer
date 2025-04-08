const express = require('express');
const router = express.Router();

// Search route
router.get('/', async (req, res) => {
    try {
        const { query, type } = req.query;
        if (!query) {
            return res.redirect('/');
        }

        const artworks = await req.services.metmuseum.searchArtworks(query, type);
        res.render('search-results', { 
            artworks, 
            query,
            title: `Search for "${query}" | Art Explorer`
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error performing search');
    }
});

module.exports = router;