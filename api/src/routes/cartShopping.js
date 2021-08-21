const { Router } = require("express");
/* const { dbConnection } = require("../configDB/config"); */

const router = Router();
const Usuario = require ("../models/Usuario")
const Producto= require("../models/Producto");
const Orden = require("../models/Orden");
const {validarJWTAdmin,validarJWTUser} = require ('../middleware/validarJWT');
const Stripe = require("stripe")


const stripe = new Stripe("sk_test_51JQAouFWmGEeX4od3qJjkwW2cdTVunEMWXE9PgKcNaz0sU2DvmGqLMHAIhuix7usRB1f6oSbE9ZfkD92GKRTmVdv001bFGHwHL")


//-----guarda la compra ya hecha en el usuario y en la base de datos general que seria para el adm
//-----ruta para user y admin
router.post('/',validarJWTUser, async (req,res)=>{
 
    try {
        const {medioPago, valorTotal} = req.body;

        await stripe.paymentIntents.create({

            amount: valorTotal, 
            currency: "USD",
            payment_method: medioPago,
            confirm: true
        })
        var compra= {...req.body,estado:'pagado'}      
        var res= 'ok'  
    }
    catch (error){
        var compra= {...req.body,estado:'cancelado'}
        var res='pago rechazado'
    }
    finally{
        const orden= new Orden(compra);
        const id=req.uid
        orden.user=id
        await orden.save();
        await Usuario.findByIdAndUpdate(id, {$push:{"historialDeCompras": orden}})
        res.send({ok:res})
    }

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
