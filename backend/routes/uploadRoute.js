
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

// 
app.get("/getCertificate/", async (request, response) => {
  try {
    console.log(request.query)
    const res = await userModel.find(request.query);
    console.log(res)
    response.send(res)
  } catch (error) {
    response.status(500).send(error);
  }
});

// upload a record in the database
app.post("/certificates/upload", async (request, response) => {
  const user = new userModel(request.body);
  try {
    await user.save();
    response.status(200).send("Uploaded Successfully")
  } catch (error) {
    response.status(500).send(error);
  }
});

// delete a particular record
app.delete("/certificates/delete/:id", async (request, response) => {
  try {
    const certificate = await userModel.findByIdAndDelete(request.params.id);

    if (!certificate) response.status(404).send("No item found");
    response.status(200).send("Record deleted successfully.");
  } catch (error) {
    console.log(error)
    response.status(500).send(error);
  }
});

// delete all the records
app.delete("/certificates/delete/", async (request, response) => {
  try {
    await userModel.deleteMany({});
    response.status(200).send("All info deleted succesfully.");
  } catch (error) {
    console.log(error)
    response.status(500).send(error);
  }
});


module.exports = app;
