"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");

const rawdata = fs.readFileSync("./data/templates.json");
const templates = JSON.parse(rawdata);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/templates", (req, res) => {
  res.send(templates);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
