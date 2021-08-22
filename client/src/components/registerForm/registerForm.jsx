import React from 'react';


export default function RegisterForm({isOpen, closeModal}){

    return (
        <div className={`modal ${isOpen && 'modal-open'}`}>
            <div className="modal_dialog">
            <button className="close" onClick={closeModal}>X</button>
            <form  className="formLogin">
                    <h1 className="loginUser">Usuario</h1>
                    <input  placeholder="username" name="email" />
                    <h1 className="loginPass">Contraseña</h1>
                    <input placeholder="password" name="password" type="password"/>
                    <h1 className="loginPass">Correo electronico</h1>
                    <input placeholder="email" name="email" type="email"/>
                    <input id="buttonInput" type="submit" className="logginBtn" value ="Registrate"/>
                </form>
        </div>
        </div>
    )
}