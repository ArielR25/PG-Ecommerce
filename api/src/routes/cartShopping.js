const { Router } = require("express");
/* const { dbConnection } = require("../configDB/config"); */

const router = Router();
const Usuario = require ("../models/Usuario")
const Producto= require("../models/Producto");
const Orden = require("../models/Orden");
const {validarJWTAdmin,validarJWTUser} = require ('../middleware/validarJWT');

//-----guarda la compra ya hecha en el usuario y en la base de datos general que seria para el adm
//-----ruta para user y admin
router.post('/',validarJWTUser, async (req,res)=>{
    const orden= new Orden(req.body);
    orden.user=req.uid
    await orden.save();

    const id=req.uid
    await Usuario.findByIdAndUpdate(id, {$push:{"historialDeCompras": orden}})


    res.send({ok:true})
});
//------busca el libro, cambia el stock y lo envia al front para el carrito

router.get('/removeOne/:idRemoveOne',async (req,res)=>{
    const {idRemoveOne}= req.params

    var book = await Producto.findById(idRemoveOne)
    book = await Producto.findByIdAndUpdate({"_id":idRemoveOne},{"stock":book.stock+1},{new:true})

    res.send(book)
});

router.get('/removeAll/:idProducto/:count',async (req,res)=>{
    const {idProducto, count}= req.params

    var book = await Producto.findById(idProducto)
    book = await Producto.findByIdAndUpdate({"_id":idProducto},{"stock":book.stock+Number(count)},{new:true})

    res.send(book)
});

router.get('/:idProducto',async (req,res)=>{
    const {idProducto}= req.params

    var book = await Producto.findById(idProducto)
    book = await Producto.findByIdAndUpdate({"_id":idProducto},{"stock":book.stock-1},{new:true})

    res.send(book)
});

module.exports = router;
