const express = require("express");
const cluster = require("cluster");
const { generateKeyPair } = require("crypto");
const data = require("./data.json");
// Check the number of available CPU.
const numCPUs = require("os").cpus().length;
// console.log(cluster.schedulingPolicy);
// console.log(cluster.SCHED_RR);
// console.log(cluster.SCHED_NONE);
const app = express();
const PORT = 3000;
let postReq = { num: 0 };
// For Master process
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // This event is firs when worker died
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}

// For Worker
else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(PORT, (err) => {
    err
      ? console.log("Error in server setup")
      : console.log(`Worker ${process.pid} started`);
  });

  // API endpoint
  // Send public key
  app.get("/", (req, res) => {
    res.json(data);
    console.log(res.header, req.headers, req.body);
  });

  app.post("/", (req, res) => {
    console.log(req.headers);
    res.json(data);
    postReq.num += 1;
    console.log("Request received", postReq.num, process.pid);
  });
}
