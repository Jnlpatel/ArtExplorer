const axios = require('axios');

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

async function searchLocation(query) {
    try {
        const response = await axios.get(NOMINATIM_URL, {
            params: {
                q: query,
                format: 'json',
                limit: 5,
                addressdetails: 1
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching location:', error);
        return [];
    }
}

async function getMuseumLocation(museumName, city = '') {
    try {
        let query = museumName;
        if (city) query += `, ${city}`;
        
        const locations = await searchLocation(query);
        
        // Find the most relevant result (museum)
        const museum = locations.find(loc => 
            loc.type === 'museum' || 
            loc.class === 'tourism' || 
            loc.display_name.toLowerCase().includes('museum')
        );
        
        return museum || locations[0];
    } catch (error) {
        console.error('Error getting museum location:', error);
        return null;
    }
}

module.exports = {
    searchLocation,
    getMuseumLocation
};