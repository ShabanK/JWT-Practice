const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];

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

app.post("/signup", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashed };
    users.push(user);
    res.status(201).send("USER CREATED");
  } catch {
    res.status(500).json({ err: "Error" });
  }
});

app.post("/login", async (req, res) => {
  const user = users.find(user => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const username = req.body.username;
      jwt.sign();
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/login", (req, res) => {
  //authenticate
});

app.listen(5000, () => {
  console.log("Server is live");
});
