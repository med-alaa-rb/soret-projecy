var fsRouter = require("express").Router();
const date = require("date-and-time");
const fs = require("fs");
let shapes = [];
let stops = [];
let stops_time = [];
let fixShp = (x) => x.slice(0, x.indexOf("_"));

fsRouter.get("/data/2020/shapes/:id", (req, res) => {
  var info = req.params.id;
  shapes = [];
  fs.readFile("../2020/shapes.txt", (error, data) => {
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
      shapes.push(obj);
    }
    var myObj = {};
    var shp = [];
    for (var i = 0; i < shapes.length - 1; i++) {
      var id = shapes[i].shape_id;
      if (shp.includes(fixShp(id)) === false) {
        shp.push(fixShp(id));
        myObj[fixShp(shapes[i].shape_id)] = Array(0);
      }
    }
    for (var i = 0; i < shp.length; i++) {
      myObj[shp[i]] = shapes.filter(
        (el) => fixShp(el.shape_id) == shp[i] && el.shape_pt_sequence % 2 === 0
      );
    }
    console.log(myObj[fixShp(info)]);
    res.send(myObj[fixShp(info)]);
  });
});

fsRouter.get("/data/2020/stops", (req, res) => {
  stops = [];
  fs.readFile("../2020/stops.txt", (error, data) => {
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
      stops.push(obj);
    }
    res.send(stops);
  });
});

fsRouter.post("/data/2020/stop_times", (req, res) => {
  stops_time = [];
  var info = req.body.id;
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
    var filtred = stops_time.filter((el) => el.stop_id == info);
    let getNextTimeFromArr = (str) =>
      typeof str == "string"
        ? parseFloat(str.slice(0, 5).replace(":", ""))
        : str;
    const now = getNextTimeFromArr(new Date().toLocaleTimeString());
    let newFiltred = filtred.filter(
      (el) => 1200 < getNextTimeFromArr(el.arrival_time)
    );
    console.log(filtred.length, newFiltred.length);
    res.send(newFiltred);
  });
});

fsRouter.post("/data/2020/tripFetch", (req, res) => {
  var trips = [];
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
      trips.push(obj);
    }
    var info = req.body.id;
    var trip = trips.filter((element) => element.trip_id == info);
    res.send(trip);
  });
});

module.exports = { fsRouter };
