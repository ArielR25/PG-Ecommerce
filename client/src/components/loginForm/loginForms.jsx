import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import userLogin from '../../funciones/logIn'
import {useDispatch} from 'react-redux';
import RecoverPopUp from '../recoverPass/recoverPopUp.jsx';
import  './loginForms.css';


export default function LoginForms  ({isOpen, closeModal,payload}){
        const dispatch = useDispatch();
        const [data, setData] = useState({
            email:"",
            password:""
        });

        //funcion envia datos al BK
        const handleSumbit =  async (e) => {
            e.preventDefault();
            const a = await dispatch( userLogin(data))
            window.localStorage.setItem("token", a.token)
            console.log(a.token)
        }

        const handleChange = (e) =>{
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }

        //loggin google
        const respuestaGoogle = async (respuesta)=>{
            const login = {
                password: respuesta.profileObj.googleId,
                email: respuesta.profileObj.email
            }
            const a = await dispatch(userLogin(login))
            window.localStorage.setItem("token", a.token)
        }
        return(
            <div className={`modal ${isOpen && 'modal-open'}`}>
                <div className="modal_dialog">
                <button className="close" onClick={closeModal}>X</button>
                <form onSubmit={handleSumbit} className="formLogin">
                        <h1 className="loginUser">Usuario</h1>
                        <input  placeholder="username" name="email" onChange={handleChange} value={data.username}/>
                        <h1 className="loginPass">Contraseña</h1>
                        <input placeholder="password" name="password" type="password" onChange={handleChange} value={data.password}/>
                        <input id="buttonInput"  type="submit" className="logginBtn" value ="Logueate" />
                    </form>
    
                   {/*  google button  /}
                    <GoogleLogin
                        clientId="1306055516-vqakgi1c0sql95der98ul0vpsufbppd9.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={respuestaGoogle}
                        onFailure={respuestaGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
    
                    {/ recupera la contraseña gil */}
                    <RecoverPopUp/>
                </div>
            </div>
        );
    };
    