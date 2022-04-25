const express = require("express");
const app = express();
const data = require("./data.json");
const port = 3000;
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let postReq = 0;

app.get("/", (req, res) => {
  res.json(data);
  console.log(res.header, req.headers, req.body);
});

app.post("/", (req, res) => {
  console.log(req.headers);
  res.json(data);
  console.log("Request received", ++postReq);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
