//Entry point (file to be executed)

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();
const DBCONN =
  "mongodb+srv://pekstar:pekstar123@cluster0.eyxys.mongodb.net/ecommerce";

//app-create server
const app = express();
let CONN = false;

// database
mongoose
  .connect(DBCONN, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTION SUCCESS");
    CONN = true;
  })
  .catch((err) => {
    CONN = false;
    console.log("DB CONNECTION ERROR", err.message);
  });

//middlewares- function running in between ie. when perfoming certain actions - use method is used
//display terminal url status
app.use(morgan("dev"));
// body-parser allows express read the post body and parse it to a json object
app.use(bodyParser.json({ limit: "2mb" }));
//cors - allows restricted resources on website to be resquested from another domain
app.use(cors());

// route autoload
// prefix all routes with the /api key ie. /api/delete-user
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.get("/dbconn", (req, res) => {
  CONN
    ? res.send("DATABASE CONNECTION ESTABLISHED!")
    : res.send("DATABASE NOT CONNECTED!");
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Running server on port ${port}`));
