async function loadJSON() {
    try {
        const response = await fetch('locations.json');
        if (!response.ok) {
            throw new Error(`Network respponse was not ok ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching the JSON data:', error)
    }
}

loadJSON();

mapboxgl.accessToken = 'my-token';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/standard',
    center: [-118.113491, 34.111745], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});





