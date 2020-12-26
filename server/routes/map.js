var myMap = require("express").Router();
var fakeDOM = require("fake-dom");
var window = fakeDOM.window;
var document = fakeDOM.document;


var L = require("leaflet");


 var addStops = (array) =>{
  for (var i = 0; i < 1; i++) {
    this.newMarker =  marker([array[i].stop_lat, array[i].stop_lon], {
      draggable: false,
    }).bindPopup(array[i].stop_name).openPopup();
  }
}

myMap.get("/api/sendMap", (req, res) => {
  var marker = new L.marker([50.5, 30.5]);
  res.send(marker);
});

myMap.post("/api/mapFromFront", (req, res) => {
  console.log(res);
});

module.exports = myMap;
