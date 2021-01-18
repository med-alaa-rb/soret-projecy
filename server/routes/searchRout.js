var searchRouter = require("express").Router();
const date = require("date-and-time");
const fs = require("fs");
let stops = [];
let stops_time = [];
let newTrips = [];
let fixShp = (x) => x.slice(0, x.indexOf("_"));

searchRouter.get("/data/2020/searchStops/:id", (req, res) => {
  var id = req.params.id.toLowerCase();
  stops = [];
  var result = [];
  fs.readFile("../2020/stops.txt", async (error, data) => {
    if (error) {
      throw error;
    }
    let myData = await data
      .toString()
      .split("\n")
      .map((el) => [el][0].split(","));
    for (var i = 1; i < myData.length; i++) {
      var obj = {};
      for (var j = 0; j < myData[i].length; j++) {
        obj[myData[0][j]] =
          myData[i][j].match(/^[0-9, .]+$/) != null
            ? JSON.parse(myData[i][j])
            : myData[i][j];
      }
      stops.push(obj);
    }
    result = await stops.filter(
      (el) => el.stop_name.toLowerCase().search(id) != -1
    );
    !result ? res.send(null) : res.send(result);
  });
});

searchRouter.get("/data/2020/searchTripDes/:id", (req, res) => {
  console.log(req.params);
  stops_time = [];
  newTrips = [];
  fs.readFile("../2020/stop_times.txt", (error, data) => {
    if (error) {
      throw error;
    }
    let myData = data
      .toString()
      .split("\n")
      .map((el) => [el][0].split(","));
    for (var i = 1; i < myData.length; i++) {
      var obj = {};
      for (var j = 0; j < myData[i].length; j++) {
        obj[myData[0][j]] =
          myData[i][j].match(/^[0-9,.,\b.] +$/) != null
            ? JSON.parse(myData[i][j])
            : myData[i][j];
      }
      stops_time.push(obj);
    }
    var newStops = stops_time.filter((el) => el.stop_id == req.params.id);
    var trips = [];
    newStops.forEach((el) => trips.push(parseInt(el.trip_id)));
    fs.readFile("../2020/trips.txt", (error, data) => {
      if (error) {
        throw error;
      }
      let myData = data
        .toString()
        .split("\n")
        .map((el) => [el][0].split(","));
      for (var i = 1; i < myData.length; i++) {
        var obj = {};
        for (var j = 0; j < myData[i].length; j++) {
          obj[myData[0][j]] =
            myData[i][j].match(/^[0-9, .]+$/) != null
              ? JSON.parse(myData[i][j])
              : myData[i][j];
        }
        newTrips.push(obj);
      }
      var result = [];
      newTrips.forEach((el) => {
        if (trips.includes(el.trip_id) && !result.includes(el.shape_id)) {
          result.push(el.shape_id);
        }
      });
      res.send(result);
    });
  });
});

module.exports = { searchRouter };
