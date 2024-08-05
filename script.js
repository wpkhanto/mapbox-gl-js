async function loadJSON() {
    try {
        const response = await fetch('locations.json');
        if (!response.ok) {
            throw new Error(`Network respponse was not ok ${response.statusText}`);
        }
        const data = await response.json();

        const bounds = new mapboxgl.LngLatBounds();

        data.data.data[6].locations.forEach(loc => {
            // Create marker
            const el = document.createElement('div');
            el.className = 'marker';

            // Add marker
            new mapboxgl.Marker({
                    element: el,
                    anchor: 'bottom'
                })
                .setLngLat(loc.coordinates)
                .addTo(map);

            // Add popup
            new mapboxgl.Popup({
                    offset: 30
                })
                .setLngLat(loc.coordinates)
                .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
                .addTo(map);

            // Extend map bounds to include current location
            bounds.extend(loc.coordinates);
        });

        map.fitBounds(bounds, {
            padding: {
                top: 200,
                bottom: 150,
                left: 100,
                right: 100
            }
        });

    } catch (error) {
        console.error('Error fetching the JSON data:', error)
    }
}

loadJSON();

mapboxgl.accessToken = 'my-token';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/standard',
    // center: [-118.113491, 34.111745], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    // zoom: 9 // starting zoom
});





