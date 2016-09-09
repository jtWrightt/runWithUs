//Function that runs at start of program, shows google map
//Zooms map to specific distance wanted
//Shows where the user is, given the user shares geocoords
function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
  center: {lat: 44.540, lng: -78.546},
    zoom: 16
  });
  
  var userPosMark = new google.maps.Marker({map: map});
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    userPosMark.setPosition(pos);
    map.setCenter(pos);
    }, function() {
      handleLocationError(true, userPosMark, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
     handleLocationError(false, userPosMark, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, userPosMark, pos) {
  userPosMark.setPosition(pos);
  userPosMark.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}