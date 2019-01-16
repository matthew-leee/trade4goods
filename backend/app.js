const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors")
const router = require("./router/generalRouter")

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());



app.use("/", router)

app.listen(8080, ()=>{console.log ("Server is on. Port@8080")})
  