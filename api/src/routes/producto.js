const { Router } = require("express");
const router = Router();

const { dbConnection } = require("../configDB/config");
const Producto = require("../models/Producto");
const mongoose = require("mongoose");
const { findById } = require('../models/Producto');

dbConnection();

router.get("/", async (req, res) => {
  var books = await Producto.find({});
  res.json(books);
});

router.post("/", async (req, res) => {
  const {
    titulo,
    autor,
    editorial,
    descripcion,
    fecha,
    paginas,
    generos,
    img,
    idioma,
    precio,
  } = req.body;

  const producto = new Producto({
    titulo,
    autor,
    editorial,
    descripcion,
    fecha,
    paginas,
    generos,
    img,
    idioma,
    precio,
  });

  await book.save((err, productStored)=>{
    err ? res.status(500).send({message:'no se pudo crear el producto'}) : res.status(201).send(productStored)
});

  mongoose.connection.close();

  res.json({ ok: true });

});

router.put('/edit/:id',async (req,res)=>{
    const {id}=req.params
    const update= req.body

    const editBook= await Book.findByIdAndUpdate(id,update, (err, productUpdate)=>{
        err ? res.status(500).send({message:'error al actualizar'}) : res.status(201).send(productUpdate)
    });

});

module.exports = router;
