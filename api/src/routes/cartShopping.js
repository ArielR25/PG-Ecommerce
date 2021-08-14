const { Router } = require("express");
const { dbConnection } = require("../configDB/config");
const mongoose = require("mongoose");

const router = Router();

const Usuario = 'ira el usuario al crearlo'
const Producto= require("../models/Producto");

dbConnection();

//-----guarda la compra ya hecha en el usuario
router.post('/',async (req,res)=>{
    const cart = req.body
    const idUser='lo resivo por JSON WEB TOKEN'
    await Usuario.findByIdAndUpdate({"_id":idUser},{$push:{"shopping": cart}})
    
    res.send({ok:true})
});

//------busca el libro, cambia el stock y lo envia al front para el carrito
router.get('/:idProducto',async (req,res)=>{
    const {idProducto}= req.params

    var book = await Producto.findById(idProducto)
    book = await Producto.findByIdAndUpdate({"_id":idProducto},{"stock":book.stock-1},{new:true})

    res.send(book)
});

module.exports=router