require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const dummy = [
  {
    username: "Dude",
    title: "POST 1"
  },
  {
    username: "Shaban",
    title: "POST 1.5"
  },
  {
    username: "Supreme",
    title: "POST 2"
  }
];

const app = express();

//middleware
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/posts", authenticateToken, (req, res) => {
  res.json(dummy.filter(post => post.username === req.user.username));
});

app.listen(5000, () => {
  console.log("Server is live");
});
