import React from 'react'
import {Link} from 'react-router-dom'

export default function CardOrdenes({props}){
    const {user,_id,productos,estado,valorTotal,fecha,}=props

    return (
        <div>
            <Link to={`/orden/detail/${_id}`}><h2>compra</h2></Link>
            <p>N° de compra {_id}</p>
            <div>
                <p>{`${user.nombre} ${user.apellido}`}</p>
                <p>{`fecha de compra: ${fecha.split('.')[0]}`}</p>
                <label>Estado:{estado}</label>
                <div>
                    <h4>Productos</h4>
                    {productos.map(e=><p key={e._id}>{`${e.producto.titulo} ${e.cantidad} U`}</p>)}
                </div>
                <label>{valorTotal}</label>
            </div>
            
        </div>
    )
}
