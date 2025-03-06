var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require('path');

let routes = fs.readdirSync(path.join(__dirname));

for (let route of routes) {
  if (route.includes(".js") && route !== "index.js") {
    router.use("/" + route.replace(".js", ""), require(path.join(__dirname, route)));
  }
}

module.exports = router;