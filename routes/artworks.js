const express = require('express');
const router = express.Router();

// Artwork detail route
// In your artworks.js route
router.get('/:id', async (req, res) => {
    try {
        const artwork = await req.services.metmuseum.getArtworkDetails(req.params.id);
        if (!artwork) {
            return res.status(404).send('Artwork not found');
        }
        
        let museumLocation = null;
        if (artwork.repository) {
            museumLocation = await req.services.openstreetmap.getMuseumLocation(
                artwork.repository, 
                artwork.city || artwork.country
            );
        }
        
        // Get related artworks (by same artist or same department)
        let relatedArtworks = [];
        if (artwork.artistDisplayName) {
            relatedArtworks = await req.services.metmuseum.searchArtworks(artwork.artistDisplayName);
        }
        
        res.render('artwork-detail', { 
            artwork, 
            museumLocation,
            relatedArtworks: relatedArtworks.filter(a => a.objectID !== artwork.objectID),
            title: `${artwork.title} | Art Explorer`
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading artwork details');
    }
});

module.exports = router;