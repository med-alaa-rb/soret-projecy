var fsRouter = require("express").Router();
const fs = require("fs");
let shapes = [];
let stops = [];
let stops_time = [];

fsRouter.get("/data/2020/shapes", (req, res) => {
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
    res.send(shapes);
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

fsRouter.get("/data/2020/stop_times_all_file", (req, res) => {
  stops_time = [];
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
    console.log(stops_time.length);
    res.send(stops_time);
  });
});

fsRouter.post("/data/2020/stop_times", (req, res) => {
  console.log(stops_time);
  var info = req.body.id;
  var filtred = stops_time.filter((el) => el.stop_id !== info);
  console.log(filtred);
  res.send(filtred);
});

module.exports = { fsRouter };
