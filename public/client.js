function initMap() {
  var directionsService = new google.maps.DirectionsService({});
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable:true,
    map:map,
    panel: document.getElementById('right-panel')
  });
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
  
  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });
  
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

function computeTotalDistance(result) {
  var total = 0;
  var myRoute = result.routes[0];
  var mes = " meters";
  for (var i = 0;i<myRoute.legs.length;i++) {
    total += myRoute.legs[i].distance.value;
  }
  if(document.getElementById('km').checked) {
    if(total/1000 < 1) {
    } else {
      total = total / 1000;
      mes = " km";
  }
  } else {
    if(total*3.28<5280) {
      total = total * 3.28;
      mes = " feet";
    } else {
      total = (total/1000)*0.62;
      mes = " miles";
    }
    
  }
  document.getElementById('total').innerHTML = total.toFixed(3) + mes;
}
