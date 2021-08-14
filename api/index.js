require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { dbConnection } = require("./src/configDB/config");

const app = express();

const routes = require("./src/routes/index");

app.use(cors());
//crear servidor express
app.use(express.json());

app.use("/", routes);
dbConnection();
//escuchar peticiones
app.listen(4000, () => {
  console.log("Servidor corriento en el puerto 4000");
});
