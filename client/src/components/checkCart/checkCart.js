import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
import {IoMdRemoveCircleOutline, IoMdAddCircleOutline, IoIosCloseCircle } from "react-icons/io";
import swal from 'sweetalert';

import {addCart,removeAllCart, clearCart, removeOneCart} from '../../Actions/index'


export default function CheckCart(){
    const dispatch = useDispatch()
    const history= useHistory()

    const carts = useSelector((state)=>state.cart)

    const arrayCart=[]
    let precioTotal= 0   

    for (const i in carts) {
        arrayCart.push(carts[i])
        precioTotal+=carts[i].precio*carts[i].count
    }

    function comprar(){
        swal("purchase made!", "you will receive an email soon", "success");
          dispatch(clearCart())
          history.push('/')
    }
    return (
        <div>
            {arrayCart.map(e=>{
                return (<div>
                    <button className='cartsButton' onClick={()=> dispatch(removeAllCart(e._id))}><IoIosCloseCircle/></button>
                        <p>{e.titulo}</p>
                        <p>Unidades: {e.count}</p>
                        <p>Precio: {e.precio * e.count}</p>
                        <div>
                            <button className='cartsButton' onClick={()=> dispatch(addCart(e._id))}><IoMdAddCircleOutline /></button>    
                            <button className='cartsButton' onClick={()=> dispatch(removeOneCart(e._id))}><IoMdRemoveCircleOutline /></button>
                        </div>                  
                    </div>)
            })}
            <div>
                <p>Precio: {precioTotal} </p>
                <p>iva: {(Math.round(precioTotal * 0.5))}</p>
                <p>Total: {(Math.round(precioTotal + precioTotal * 0.5))}</p>
            </div>
            <button onClick={()=>comprar()}>Pagar</button>
        </div>
    )
}
