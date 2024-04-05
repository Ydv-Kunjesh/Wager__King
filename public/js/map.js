mapboxgl.accessToken = MAP_API; 
     const map = new mapboxgl.Map({
     container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]
     zoom: 13, // starting zoom
     });

     // console.log(geometry);
    

     const marker1 = new mapboxgl.Marker({color: "red",trackUserLocation: true})
         .setLngLat(listing.geometry.coordinates)
         .setPopup( new mapboxgl.Popup({ offset: 1 })
        .setHTML(`<h1> ${listing.location} </h1>`))
        .addTo(map);


        // Initialize the GeolocateControl.
const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
geolocate.on('geolocate', () => { });











      