const jwt = require('jsonwebtoken')
const {CLAVE_TOKEN}=process.env

const generarJWT =(uid, nombre, admin)=>{
    return new Promise ((resolve,reject)=>{
        const payload = {uid, nombre, admin};

        jwt.sign(payload,CLAVE_TOKEN, {
            expiresIn: '1d'
        },(err , token)=>{
            err ? reject('no se puede generar el token') : resolve(token)
        })
    })
}

module.exports={
    generarJWT
}