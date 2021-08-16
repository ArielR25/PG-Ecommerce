
const Producto = require("../models/Producto");
const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

router.get("/", async (req, res) => {
  var books = await Producto.find({},{"editorial":0, "descripcion":0,"fecha":0, "paginas":0,"idioma":0,"stock":0});
  res.status(200).json(books);
});

router.get('/:id', async(req,res)=>{
  const {id}=req.params
  const bookDetail = await Producto.findById(id) 
  res.status(200).send(bookDetail)
})

router.post("/", async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();

    res.status(201).send(producto);     

  } catch (error) {
    res.status(500).send({ok: false, msg:' nose pudo crear el producto'}); 
  }
});

router.put('/edit/:id',async (req,res)=>{
  const {id}=req.params
  const update= req.body
  const editBook= await Producto.findByIdAndUpdate(id,update); 
  res.status(201).send(editBook);
})



module.exports = router;
