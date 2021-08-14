import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

import BookCart from '../bookCart/bookCart';

export  default function Cart() {
    const allCart = useSelector(state => state.cart)

    const dispatch = useDispatch()
    const history = useHistory()  

    const [state, setstate] = useState(allCart)

    // useEffect(() => {
    //     setstate(allCart)
    // }, [allCart])

    const arrayComponent=[]
    for(const i in state){
        arrayComponent.push(<BookCart state={state[i]}/>)
    }

    return (
            <div>
                {!state ? 
            ( 
            <div>
                <h3>Tu carrito está vacío</h3>
                    <p>¿No sabés qué comprar? ¡Miles de libros te esperan!</p>
                </div>
                )
                : (
                    arrayComponent
                )
            }
            </div>
        )
    }
