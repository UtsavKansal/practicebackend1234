const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const uri = process.env.DATABASE_URL;

app.use(express.json());
app.use(cors);

mongoose.connect(uri);

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
});
app.post("/createUser", async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
