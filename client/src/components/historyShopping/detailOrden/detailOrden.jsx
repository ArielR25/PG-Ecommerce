import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router";
import Select from 'react-select';
import {Link} from 'react-router-dom'

import {getOrdenesID,updateOrden} from '../../../Actions/index'
import { payloadJWT } from '../../../funciones/payloadJWT'

export default function DetailOrdenAdmin (){

    const dispatch = useDispatch()
    const {id } = useParams();
    const state = useSelector(state => state.ordenDetail)
    let token= window.localStorage.getItem('token')
    const {admin}=payloadJWT()
    const{user,productos}=state

    var opcion1=[{ value:'cancelada',label:'cacelada'},{ value:'procesando',label:'procesando'}]
    var opcion2=[{ value:'cancelada',label:'cacelada'},{ value:'completa',label:'completa'}]

    

    useEffect(() => {
        dispatch(getOrdenesID(id))
    }, [dispatch,id])
    return (
        <div>
            { state.user ?(<div>
                <div>
                    <h2>Datos del comprador</h2>
                    <p>{`${user.nombre} ${user.apellido}`}</p>
                    <p>{`${user.email}`}</p>
                </div>
                <div>
                    <h2>Datos de la compra</h2> 
                    <label>N° de compra: {state._id}</label>
                    <p>fecha: {state.fecha.split('.')[0].replace('T',' ')}</p>
                <div>
                    <p>Productos</p>
                    {productos.map(e=>(
                        <div key={e._id}>
                            <Link to={`/details/${e.producto._id}`}><p>{`${e.producto.titulo} ${e.producto.precio}`}</p></Link>
                            <p>{e.cantidad}U</p>
                            <p>{e.cantidad * e.producto.precio}</p>

                        </div>
                    ))}
                    <p>Precio Total: {state.valorTotal}</p>
                </div>
                </div>
                <div>
                    <h2>Direccion De envio</h2>
                    <p>{state.direccion}</p>
                </div>
                <div>
                  <p>estado del pedido: {state.estado}</p>
                   {admin && <Select
                        options={state.estado==='creada'? opcion1 : opcion2}
                        onChange={(e)=>dispatch(updateOrden(e.value,state._id,token))}
                    />}
                </div>
            </div>):(<p>Cargando...</p>)}
        </div>
    )
}
