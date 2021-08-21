import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrdenesUser, getOrdenes,filtrarOrdenes} from '../../Actions/index'
import { payloadJWT } from '../../funciones/payloadJWT'
import CardOrdenes from './cardOrdenes/cardOrdenes'
import Select from 'react-select';

export default function HistoryShopping(){
    const token= window.localStorage.getItem('token')
    const admin=payloadJWT()
    const dispatch = useDispatch()
    const ordenesDeCompras= useSelector(state => state.ordenes)

    
 useEffect(() => {
    admin.admin ? dispatch(getOrdenes()) : dispatch(getOrdenesUser(token))
    console.log('a')
 }, [token,admin.admin,dispatch])

    const opcion=[{ value:'creada',label:'creada'},{ value:'cancelada',label:'cancelada'},{ value:'procesando',label:'procesando'},{ value:'completada',label:'completada'}]

    return (
        <div>
            {admin.admin ?( <div>
                <h2>Historial de Pedidos</h2>
                <div>
                    <p>Filtrar por</p>
                <Select
                        options={opcion}
                         onChange={(e)=>dispatch(filtrarOrdenes(e.value))}
                    />
                </div>
                <div>
                {ordenesDeCompras.length>0? ordenesDeCompras.map(e=> <CardOrdenes props={e} key={e._id}/>) : <p>Aun no hay compras realizadas</p>} 
                </div>
        </div>):
           ( <div>
                <h2>Hitorial de compras</h2>
                <div>
                <p>Filtrar por</p>
                <Select
                        options={opcion}
                        onChange={(e)=>dispatch(filtrarOrdenes(e.value))}
                    />
                </div>
                <div>
                {ordenesDeCompras.length>0? ordenesDeCompras.map(e=> <CardOrdenes props={e} key={e._id}/>):<p>Aun no hay compras realizadas</p>} 
                </div>
            </div>)
            }
           
        </div>
    )
}
