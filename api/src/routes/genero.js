const { Router } = require("express");
const router = Router();

const { dbConnection } = require("../configDB/config");
const Book = require("../models/Producto");
const Genero = require("../models/Genero");
const mongoose = require("mongoose");

dbConnection();

router.get("/", async (req, res) => {
  const resp= await Book.find({},{"generos":1,"_id":0})

  var array=resp.map(e=>e.generos)
  array=[].concat.apply([], array)

  const arrayFiltrado= array.filter((valor, indice) => {
      return array.indexOf(valor) === indice;
  })
  res.status(200).send(arrayFiltrado)

  mongoose.connection.close();
});

router.post("/add", async (req, res) => {
  const { genero } = req.body;

  const newGenero = new Genero({ genero });

  await newGenero.save((err,generoStored)=>{
    err ? res.status(500).send({message:'error al crear el genero'}) : res.status(201).send(productUpdate)
});
mongoose.connection.close();

res.send(newGenero)
});

module.exports = router;
