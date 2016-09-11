function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  startPos = "";
  endPos = "";
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 16
  });
  directionsDisplay.setMap(map);
  var userMarker = new google.maps.Marker({
    map: map
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      userMarker.setPosition(pos);
      map.setCenter(pos);
    });
  }
  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay, pos);
  };
  google.maps.event.addListener(map, 'click', function(event) {
    endPosMarker = new google.maps.Marker({position: event.latLng, map: map});
    endPos = event.latLng;
    calculateAndDisplayRoute (directionsService, directionsDisplay);
    endPosMarker.setMap(null);
});
  google.maps.event.addListener(map, 'rightclick', function(event) {
    startPosMarker = new google.maps.Marker({position: event.latLng, map : map});
    startPos = event.latLng;
    calculateAndDisplayRoute (directionsService, directionsDisplay);
    startPosMarker.setMap(null);
  });
}

function calculateAndDisplayRoute (directionsService, directionsDisplay) {
  if(startPos == ""){
    directionsService.route({
    origin: pos,
    destination: endPos,
    travelMode: 'WALKING'
  }, function(response,status) {
    if(status === "OK") {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions failed due to ' + status);
    }
  });
  }
  else if (endPos === "") {
    directionsService.route({
    origin: startPos,
    destination: pos,
    travelMode: 'WALKING'
  }, function(response,status) {
    if(status === "OK") {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions failed due to ' + status);
    }
  });
  } else {
    directionsService.route({
    origin: startPos,
    destination: endPos,
    travelMode: 'WALKING'
  }, function(response,status) {
    if(status === "OK") {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions failed due to ' + status);
    }
  });
  }
  
}


