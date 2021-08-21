import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import userLogin from '../../Actions/index'
import {useDispatch} from 'react-redux';
import LoginGithub  from 'react-github-login';
import  './loginForms.css'


export default function LoginForms  ({isOpen, closeModal,payload}){
        const dispatch = useDispatch();
        const [data, setData] = useState({
            email:"",
            password:""
        });
        
        
        //funcion envia datos al BK
        const handleSumbit =  async (e) => {
            e.preventDefault();
            const a =  await dispatch(userLogin(data))
            window.localStorage.setItem("token", a)
            
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
        //loggin github
        const onSuccess = response => console.log(response);
        const onFailure = response => console.error(response);
        


    return(
        <div className={`modal ${isOpen && 'modal-open'}`}>
            <div className="modal_dialog">
            <button className="close" onClick={closeModal}>X</button>
            <form onSubmit={handleSumbit} className="formLogin">
                    <h1 className="loginUser">Usuario</h1>
                    <input  placeholder="username" name="email" onChange={handleChange} value={data.username}/>
                    <h1 className="loginPass">Contraseña</h1>
                    <input placeholder="password" name="password" type="password" onChange={handleChange} value={data.password}/>
                    <input id="buttonInput"  type="submit" className="logginBtn"  />
                </form>

               {/*  google button  */}
                <GoogleLogin
                    clientId="1306055516-vqakgi1c0sql95der98ul0vpsufbppd9.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={respuestaGoogle}
                    onFailure={respuestaGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                {/* gitHub button */}
                <LoginGithub clientId="ac56fad434a3a3c1561e"
                onSuccess={onSuccess}
                onFailure={onFailure}/>
                
            </div>
        </div>
    );
};



