const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
const cors = require("cors")
app.use(cors())


mongoose.connect("mongodb+srv://sridharnaryan:LysO1RQEylKRyC3f@cluster2.xmtigcn.mongodb.net/krishnaradha");
let db = mongoose.connection;

db.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB successfully");

  // Let's  build  Schema
  let arrayschema = new mongoose.Schema({
    dataArray: [{
      type: String,
      require: true,
    }],
  });

  const arraymodel = mongoose.model('arraymodel', arrayschema);

  // Let's insert data in JSON format
  const jsonDataWithArray = {
    dataArray: ["krishna", "radha", "kaise", "ho", "m acha hu app kaise ho", "jaisa hu acha hu", "tum kaisi ho ye batao", "m to thik hu app batao", "lekin ye batao life m sab thik", "wdjednj", "kjwdbed", "khdebde", "ededb", "edbed", "dkjbe", "wjndw", "dekhbekd"]
    // Other fields if needed
  };

  const document = new arraymodel(jsonDataWithArray);

  document.save()
    .then(() => {
      console.log("Data inserted successfully");
    })
    .catch((err) => {
      console.error("Error inserting data:", err);
    });
    // Routing happens here
app.get("/api/data", async(req, res) => {

  try{
    const data = await  arraymodel.find();
    res.json(data);
  }catch(error){
    console.error("error fetching data:",error);
    res.status(500).send("server error")
  }
  });

  app.listen(port, () => {
    console.log(`my server is connected at ${port}`);
  });
});
