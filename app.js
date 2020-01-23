const express = require("express");
const jwt = require("jsonwebtoken");

const dummy = [
  {
    username: "Dude",
    title: "POST 1"
  },
  {
    username: "Supreme",
    title: "POST 2"
  }
];

const app = express();

//middleware
app.use(express.json());

app.get("/posts", (req, res) => {
  res.json(dummy);
});

app.get("/login", (req, res) => {
  //authenticate
});

app.listen(5000, () => {
  console.log("Server is live");
});
