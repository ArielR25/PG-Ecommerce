import React from 'react'
import { NavLink } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import {IoMdRemoveCircleOutline, IoMdAddCircleOutline, IoMdTrash, IoIosCloseCircle } from "react-icons/io";
import {VscTasklist} from 'react-icons/vsc'
import './cart.css'
import {addCart,removeAllCart, clearCart, removeOneCart} from '../../Actions/index'

export default function Cart() {
    const dispatch = useDispatch()
    const carts = useSelector((state)=>state.cart)
    const arrayCart=[]
    for (const i in carts) {
        arrayCart.push(carts[i])
    }
    return (
        <div>
            {arrayCart.length > 0 && (<div>
                <NavLink to='/check' className='cartsButton'><VscTasklist/></NavLink>
                {arrayCart.map(e=>{
                return (<div>
                    <button className='cartsButton' onClick={()=> dispatch(removeAllCart(e._id))}><IoIosCloseCircle/></button>
                        <p>{e.titulo}</p>
                        <p>Unidades: {e.count}</p>
                        <div>
                            <button className='cartsButton' onClick={()=> dispatch(addCart(e._id))}><IoMdAddCircleOutline /></button>    
                            <button className='cartsButton' onClick={()=> dispatch(removeOneCart(e._id))}><IoMdRemoveCircleOutline /></button>
                        </div>                  
                    </div>)
                })
                }
                <button className='cartsButton' onClick={()=> dispatch(clearCart())}><IoMdTrash/></button>
            </div>)
            } 
            {
                arrayCart.length===0 && (<div><p>Tu carrito está vacío</p>
                   <p>¿No sabés qué comprar? ¡Miles de libros te esperan!</p> 
                </div>)
            }           
        </div>

    )
}
