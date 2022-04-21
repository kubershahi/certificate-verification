
const express = require("express");
const userModel = require("../models/User");
const app = express();

app.get("/", async (request, response) => {
  const user = await userModel.find({});
  try {
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/upload", async (request, response) => {
  const user = new userModel(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
