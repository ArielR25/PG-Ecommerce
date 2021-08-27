import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
import swal from 'sweetalert';
import {addBuyUser} from '../../../Actions/index'
import {CardElement,useElements, useStripe} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import "./checkCart.css"

const stripePromise = loadStripe("pk_test_51JQAouFWmGEeX4odlkQmbhbHUp3CKtVyX8x3IAZOECCAv0E7LUzOZJoUyBS8C5LTiPBgpQNd3ZdNb2oBfZeRZFCR00fcFxXLfG")


export default function CheckCart(){
    const dispatch = useDispatch()
    const history= useHistory()
    const [state,setState]= useState({
        pais:'',
        cuidad:'',
        calle:'',
        codigoPostal:''
    })
    const carts = useSelector((state)=>state.cart)
    const token= window.localStorage.getItem('token')
    const arrayCart=[]
    let precioTotal= 0   

    for (const i in carts) {
        arrayCart.push(carts[i])
    }

    var compras=[]
    for (const i in carts) {
        compras.push({producto:carts[i].id,cantidad:carts[i].count})
        precioTotal+=carts[i].precio*carts[i].count
    }

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    };
    
    const Payment = () => {

        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async(e) => {
        e.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)
        })
        if(!error) {
           const {id} = paymentMethod;
           let pago = {
            productos:compras,
            direccion: `${state.pais}/ ${state.cuidad}, ${state.calle}, CP: ${state.codigoPostal}`,
            valorTotal:Math.round(precioTotal),
            pago:id
        }

        dispatch(addBuyUser(pago,token))
        swal("Gracias por su Compra", "recibira un email con los detalles", "success");
        history.push('/')
        
          
        } else {
            console.log(error);
            
        }
    }
        return <form className= "form_compra" onSubmit={handleSubmit}>
           <CardElement className="tarjeta"/>      
           {state.pais && state.calle && state.codigoPostal && <button>
                Comprar
            </button>}

        </form>
    }


    return (
        <div className="pasarela">
            <h1 className="titulo_principal_pasarela">Resumen de la compra</h1>
        <div className="contenedor_pasarela">
            <div className="pasarela_card">
            {arrayCart.map(e=>{
                return (<div key={e._id} className="pasarela_cdtm">
                        <div>
                        <img className="imagen_pasarela"alt="imagen_pasarela"src={e.img}></img>
                        </div>
                        <div className="pasarela_info">
                        <p className="titulo_pasarela">{e.titulo}</p>
                        <p className="autor_pasarela">{e.autor}</p>
                        <p className="editorial_pasarela">{e.editorial}</p>
                        <p className="unidades_pasarela">Unidades: {e.count}</p>
                        <p className="precio_pasarela"><span className="peso_pasarela">$</span> {e.precio * e.count}</p>
                        </div>
                        
                       
                    </div>)
                    
            })}
            </div>
            <div className="datos_pasarela">
                <p className='neto_pasarela'>Sub-Total: <span className="subtotal_pasarela">$ {precioTotal.toFixed(2)}</span> </p>
                <p className='neto_pasarela'>iva: <span className="subtotal_pasarela">$ {(precioTotal* 0.1).toFixed(2)}</span> </p>
                <p className='total_pasarela'>Total: <span className="total_numero_pasarela">$ {(Math.round(precioTotal+precioTotal* 0.1))}</span></p>
            </div>
            {token ? (<div>
                <p>Facuracion</p>     
                <div>
                    <p>Direccion de envio</p>
                    <label>Pais</label>  
                    <input type='text' required autoComplete='country-name' name='pais' value={state.pais} onChange={(e)=>handleChange(e)} />    
                    <label>Cuidad</label> 
                     <input type='text' required autoComplete='off' name='cuidad' value={state.cuidad} onChange={(e)=>handleChange(e)}/>    
                    <label>Calle</label>  
                    <input type='text' required autoComplete='street-address' name='calle' value={state.calle} onChange={(e)=>handleChange(e)} />     
                    <label>Codigo Postal</label>  
                    <input type='number' required autoComplete='postal-code' name='codigoPostal' value={state.codigoPostal} onChange={(e)=>handleChange(e)}/>    
                </div>
                <div>
                    <Elements stripe={stripePromise}>
                        <Payment/>
                    </Elements>                      
                </div>
            </div>): (<div>
                <p>Para continuar con la compra debes logearte</p>

            </div>)}

        </div>
    </div>
    
    )
}