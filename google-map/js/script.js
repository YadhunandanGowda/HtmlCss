$(document).ready(function( ) {

})
function myMap() {
var mapProp= {
  center:new google.maps.LatLng(13.353352,74.920088),
  zoom:15,
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);


function addMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
CentralPark = new google.maps.LatLng(13.353352, 74.920088);
    addMarker(CentralPark);
}

