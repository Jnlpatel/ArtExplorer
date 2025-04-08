function initMap(lat, lng, museumName) {
    const location = { lat: parseFloat(lat), lng: parseFloat(lng) };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
        mapTypeId: 'roadmap',
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT
        }
    });
    
    new google.maps.Marker({
        position: location,
        map: map,
        title: museumName,
        animation: google.maps.Animation.DROP,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
    });
    
    // Add info window if needed
    const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${museumName}</h3>`
    });
    
    map.addListener('click', () => {
        infoWindow.open(map);
    });
}