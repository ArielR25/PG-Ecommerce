const {response}= require('express')
const bcrypt = require ("bcryptjs")
const Usuario = require("../models/Usuario");
const {generarJWT} = require ("../middleware/generadorJWT")


const createUser = async(req, res=response)=>{
    const {email,password}=req.body

    try {
        let user = await Usuario.findOne ({email});
       
        if(user) return res.status(400).send({ok:false, msg:'el usuario ya existe'})
    
        user = new Usuario(req.body)

        // encriptando password
        const salt = bcrypt.genSaltSync();
        user.password= bcrypt.hashSync (password,salt);

        await user.save()

        const token = await generarJWT (user.id,user.nombre,user.admin)

        res.status(201).send({ok:true,token })

    } catch (error) {
        res.sendStatus(500)
    }
}

const loginUser = async (req, res=response)=>{
    const {email,password}=req.body;

    try {
        let user = await Usuario.findOne ({email});
       
        if(!user) return res.status(400).send({ok:false, msg:'el usuario no existe'})
        const token = await generarJWT (user.id,user.nombre,user.admin)
       
        const validarPassword= bcrypt.compareSync( password, user.password)
         !validarPassword? res.status(400).send({msg:'correo o password incorrectos'}): res.status(200).send({token})
    } catch (error) {
        
    }
}

const revalidarToken = async(req, res=response)=>{
    const {uid,nombre,admin}=req
    const token = await generarJWT (uid,nombre,admin)
    res.send({token,ok:true})
}

module.exports={
    createUser,
    loginUser,
    revalidarToken
}