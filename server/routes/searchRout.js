var searchRouter = require("express").Router();
const date = require("date-and-time");
const fs = require("fs");
let stops = [];

searchRouter.get("/data/2020/searchStops/:id", (req, res) => {
  console.log(req.params.id);
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
    res.send(stops.filter((el) => el.stop_name.search(req.params.id) != -1));
  });
});

module.exports = { searchRouter };
