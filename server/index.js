var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var searchRouter = require("./routes/searchRout").searchRouter;
var fsRouter = require("./routes/fs").fsRouter;

app.use(cors());

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", searchRouter);
app.use("/", fsRouter);

var port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`app is listnening to http://localhost:${port}/`)
);
