require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//normally would do this part with mongo but for simplicity's sake...
const users = [];

const app = express();

//middleware
app.use(express.json());

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
  const user = users.find(user => user.username === req.body.username);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const username = req.body.username;
      const accessToken = jwt.sign(
        { name: username },
        process.env.ACCESS_TOKEN_SECRET
      ); //takes whatever we want to serialize
      res.json({ accessToken: accessToken });
    } else {
      res.json(req.body);
    }
  } catch {
    res.status(500).send();
  }
});

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

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(4000, () => {
  console.log("Server is live");
});
