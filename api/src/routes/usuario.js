const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const {check}  = require ('express-validator')
const {createUser, loginUser, revalidarToken} = require ('../controllers/auth')
const {validarUser} = require ('../middleware/validarUser')
const {validarJWTUser} = require ("../middleware/validarJWT")
const Usuario = require("../models/Usuario")


//----crea un nuevo usuario,los check son los campos oblogatorios, genera un token
//----si es con google enviar como clave el googleid
router.post(
    '/',
    [
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('apellido','el nombre es requerido').not().isEmpty(),
        check('email','el email es obligtorio').isEmail().not().isEmpty(), 
        check('password','la contraseña debe tener minimo 6 cataracteres').isLength({min:6}).not().isEmpty(),
        validarUser
    ],
    createUser
);
//----logea al usuario, recibe email y paswors, si es google envia googleid como clave,genera token
router.post(
    '/login',
    [
        check('email','el email es obligtorio').isEmail().not().isEmpty(), 
        check('password','la contraseña debe tener minimo 6 cataracteres').isLength({min:6}).not().isEmpty(),
        validarUser
    ],
    loginUser
);
//----elimina un usuario para que no se pueda logear
router.delete('/delete/:id',(req,res)=>{
    const id= req.uid
    Usuario.findByIdAndDelete(id)
    res.send({ok:true, msg:'el usuario fue borrado'})
})

//---esta en ver, es para regenerar el token
router.get('/renew',validarJWTUser, revalidarToken)

//----trae todo el historial de compras de un usuario en especifico
//----deben enviar token desde el front
router.get('/historyShopping',validarJWTUser, async(req,res)=>{
    const id=req.uid
    const historyShopping= await Usuario.findById(id)

    res.send(historyShopping.historialDeCompras)

});

//-----trae los detalles de una orden en especifico
//-----info de producto, cantidas,direccion de entrga y info de usuario de compa
//-----recibe id de orden por params,para user
router.get('/see/:id',validarJWTUser, async(req,res)=>{
    const {idOrden}=req.params
    const history= await Orden.findById(idOrden)
                              .populate('productos.producto',['titulo','precio'])
    res.send(history)
})

module.exports = router;