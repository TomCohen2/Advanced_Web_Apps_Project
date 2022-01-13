const express = require("express");
global.bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
let dbConfig = require("./database/db");

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    (error) => {
      console.log("Could not connect to database : " + error);
    }
  );

const PORT = process.env.PORT || 3001;
const adRoute = require("./routes/ad.route");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/ads", adRoute);

var MongoClient = require("mongodb").MongoClient;

const connectionString =
  "mongodb+srv://TomCohen:Tc12345@mycluster.9z8tl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(connectionString, function (err, client) {
  if (err) throw err;

  var db = client.db("ads");

  db.collection("holidayAds")
    .find()
    .toArray(function (err, result) {
      if (err) throw err;
      if (result)
        console.log(`Connected to DB with ${result.length} documents`);

      app.get("/api", (req, res) => {
        res.json({ message: result });
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
