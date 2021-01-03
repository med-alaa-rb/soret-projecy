var fetchInfoApi = require("express").Router();

const fetch = require("node-fetch");

fetchInfoApi.get("/api/externe/cities/:id", (req, res) => {
 {
    (async () => {
      const response = await fetch(
        "http://api.geonames.org/searchJSON?username=ksuhiyp&country=tn&style=SHORT"
      );
      console.log(req.params);
      var name = req.params.id.toLowerCase();
      const data = await response.json();

      !data
        ? res.send([])
        : res.send(
            data["geonames"].filter(
              (el) => el.name.toLowerCase().search(name) != -1
            )
          );
    })();
  }
});

module.exports = fetchInfoApi;
