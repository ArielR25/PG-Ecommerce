import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrdenesUser, getOrdenes, filtrarOrdenes} from '../../Actions/index'
import { payloadJWT } from '../../funciones/payloadJWT'
import CardOrdenes from './cardOrdenes/cardOrdenes'
import Select from 'react-select';
import CardOrdenes from './cardOrdenes/cardOrdenes'

export default function HistoryShopping(){
    const token= window.localStorage.getItem('token')
    const admin=payloadJWT()
    const dispatch = useDispatch()
    const ordenesDeCompras= useSelector(state => state.ordenes)
    const [ordenes, setordenes] = useState([])

 useEffect(() => {
    admin.admin ? dispatch(getOrdenes(token)) : dispatch(getOrdenesUser(token))
 }, [token,admin.admin,dispatch])
 useEffect(() => {
    setordenes([...ordenesDeCompras])
 }, [ordenesDeCompras])

 function filtrarOrdenes(estado){
    setordenes([...ordenesDeCompras].filter(e=>e.estado===estado))
 }

 const opcion=[{ value:'creada',label:'creada'},{ value:'cancelada',label:'cancelada'},{ value:'procesando',label:'procesando'},{ value:'completada',label:'completada'}]

    return (
        <div>
            {admin.admin ?( <div>
                <h2>Historial de Pedidos</h2>
                <div>
                    <p>Filtrar por</p>
                <Select
                        options={opcion}
                         onChange={(e)=>filtrarOrdenes(e.value)}
                    />
                </div>
                <div>
                {ordenes.length>0? ordenes.map(e=> <CardOrdenes props={{...e,admin:true}} key={e._id}/>) : <p>Aun no hay compras realizadas</p>} 
                </div>
        </div>):
           ( <div>
                <h2>Hitorial de compras</h2>
                <div>
                <p>Filtrar por</p>
                <Select
                        options={opcion}
                        onChange={(e)=>filtrarOrdenes(e.value)}
                    />
                </div>
                <div>
                {ordenes.length>0? ordenes.map(e=> <CardOrdenes props={{...e,admin:false}} key={e._id}/>):<p>Aun no hay compras realizadas</p>} 
                </div>
            </div>)
            }
           
        </div>
    )
}
