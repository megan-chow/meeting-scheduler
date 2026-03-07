// https://expressjs.com/en/guide/routing.html

// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// map file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));

app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("Meeting Scheduler listening on port " + port + "!");
});
