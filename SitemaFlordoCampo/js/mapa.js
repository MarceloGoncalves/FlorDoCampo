mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2Vsb3VmYyIsImEiOiJjaW1zZWZmZTkwMWlqdXdtNHBwOGJ3NTRjIn0.05tcLcHdhSRO4bz1UxJr3w';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-39.01613035874374,-4.968104380460062], // posição inicial
  zoom: 10
});

map.addControl(new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
}));

map.addControl(new mapboxgl.NavigationControl());


//let canvas = map.getCanvasContainer();

/* let geojson = {
  "type": "FeatureCollection",
  "features": [{
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates": [-39.01613035874374,-4.968104380460062]
      }
  }]
}; */

/* function getPointBD(){

  let db = firebase.firestore();
  let mapaOfertas = db.collection('mapaOfertas');
  
  mapaOfertas.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
          if (doc.exists) {

          } else {
              //doc.data() will be undefined in this case
              console.log("cade os documentos?");
          }
      })
       .catch(function(error) {
          console.log("Error ao pegar o documento:", error);
      }); 
  });
} */


/* function onMove(e) {
  var coords = e.lngLat;

  // Set a UI indicator for dragging.
  canvas.style.cursor = 'grabbing';

  // Update the Point feature in `geojson` coordinates
  // and call setData to the source layer `point` on it.
  pontos.features[0].geometry.coordinates = [coords.lng, coords.lat];
  map.getSource('point').setData(geojson);
}

function onUp(e) {
  var coords = e.lngLat;

  // Print the coordinates of where the point had
  // finished being dragged to on the map.
  canvas.style.cursor = '';

  // Unbind mouse/touch events
  map.off('mousemove', onMove);
  map.off('touchmove', onMove);
} */


/* map.on('load', function() {

  // Add a single point to the map
  map.addSource('point', {
      "type": "geojson",
      "data": geojson
  });

  map.addLayer({
      "id": "point",
      "type": "circle",
      "source": "point",
      "paint": {
          "circle-radius": 10,
          "circle-color": "#cf702d"
      }
  }); */

  // When the cursor enters a feature in the point layer, prepare for dragging.
  /* map.on('mouseenter', 'point', function() {
      map.setPaintProperty('point', 'circle-color', '#3bb2d0');
      canvas.style.cursor = 'move';
  });

  map.on('mouseleave', 'point', function() {
      map.setPaintProperty('point', 'circle-color', '#3887be');
      canvas.style.cursor = '';
  });

  map.on('mousedown', 'point', function(e) {
      // Prevent the default map drag behavior.
      e.preventDefault();

      canvas.style.cursor = 'grab';

      map.on('mousemove', onMove);
      map.once('mouseup', onUp);
  });

  map.on('touchstart', 'point', function(e) {
      if (e.points.length !== 1) return;

      // Prevent the default map drag behavior.
      e.preventDefault();

      map.on('touchmove', onMove);
      map.once('touchend', onUp);
  });
}); */

let pontos = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-39.01613035874374,-4.968104380460062]
      },
      properties: {
        title: 'Rúcula',
        description: 'Troco Rúcula por Moringa'
      }
    },{
    type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-39.01613035874600,-4.868104380460800]
      },
      properties: {
        title: 'Cebolinha',
        description: 'Troco Cebolinha por Berinjela'
      }
    }]
};

pontos.features.forEach(function(marker) {

    // create a HTML element for each feature
    let el = document.createElement('div');
    el.className = 'marcador';
    
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p><a href="../html/login.html" class="button">'+ 'Negociar Troca'+'</a>'))
    .addTo(map);
});


