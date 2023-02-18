const express = require("express");
const path = require("path");

const app = express();

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (error) {
      if (error) {
        res.status(500).send(error);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("running");
});
