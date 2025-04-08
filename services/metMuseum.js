const axios = require('axios');

const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function searchArtworks(query, type = '') {
    try {
        // First get object IDs that match search
        let url = `${API_BASE_URL}/search`;
        const params = { q: query };
        if (type) params.medium = type;
        
        const searchResponse = await axios.get(url, { params });
        
        // Get details for the first 12 results
        const objectIDs = searchResponse.data.objectIDs.slice(0, 12);
        const artworkPromises = objectIDs.map(id => getArtworkDetails(id));
        
        return Promise.all(artworkPromises);
    } catch (error) {
        console.error('Error searching artworks:', error);
        return [];
    }
}

async function getArtworkDetails(objectID) {
    try {
        const response = await axios.get(`${API_BASE_URL}/objects/${objectID}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for artwork ${objectID}:`, error);
        return null;
    }
}

async function getFeaturedArtworks() {
    try {
        // Get recent acquisitions as featured items
        const response = await axios.get(`${API_BASE_URL}/objects?departmentIds=11`); // European Paintings
        const objectIDs = response.data.objectIDs.slice(0, 6);
        const artworkPromises = objectIDs.map(id => getArtworkDetails(id));
        return Promise.all(artworkPromises);
    } catch (error) {
        console.error('Error fetching featured artworks:', error);
        return [];
    }
}

module.exports = {
    searchArtworks,
    getArtworkDetails,
    getFeaturedArtworks
};