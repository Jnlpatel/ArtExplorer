const express = require('express');
const router = express.Router();

// Museum location search route
router.get('/:name', async (req, res) => {
    try {
        const museumName = decodeURIComponent(req.params.name);
        const location = await req.services.openstreetmap.getMuseumLocation(museumName);
        
        if (!location) {
            return res.status(404).send('Museum location not found');
        }
        
        res.render('museum-detail', { 
            museumName,
            location,
            title: `${museumName} Location | Art Explorer`
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error finding museum location');
    }
});

module.exports = router;