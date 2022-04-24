
const express = require("express");
const userModel = require("../models/User");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

app.get("/certificates", async (request, response) => {
  const user = await userModel.find({});
  try {
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/certificates/upload", async (request, response) => {
  console.log(request)
  const user = new userModel(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch("/certificates/update/:id", async (request, response) => {
  try {
    console.log(request.params)
    await userModel.findByIdAndUpdate(request.params.id, request.body);
    await userModel.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/certificates/delete/:id", async (request, response) => {
  try {
    console.log(request.params)
    const certificate = await userModel.findByIdAndDelete(request.params.id);

    if (!certificate) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    console.log(error)
    response.status(500).send(error);
  }
});


module.exports = app;
