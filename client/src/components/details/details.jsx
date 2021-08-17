import './details.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { getDetails, url} from '../../Actions';

export default function Details() {

    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const { id } = useParams();
    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(url(window.location.href))
    }, [dispatch, id]);

    let { titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio } = details;

    if(titulo) {
    return (
        <div className='details'>
        <div className="img_stock">
        <img className="imagen_detail" src={img} alt={`imagen de portada del libro: ${titulo}`} />
        <button onClick={()=>dispatch(addCart(id))}>Comprar</button> 
        <div className='stock'>
            <p>Stock:</p>
            <p>{stock}</p>
           
        </div>
        </div>
        <div className="contenido_details">
        <h2 className="titulo_detail">{titulo}</h2>
        <h3 className="autor_detail">{autor}</h3>
        <p>Editorial:</p>
        <p>{editorial}</p>
        <div className='descripcion'>
            <p>Descripción</p>
            <p>{descripcion}</p>
        </div>
        <div className='generos'>
            <p >Generos:</p>
            <p>{generos}</p>
        </div>
        <div className='fecha_lanzamiento'>
            <p className="">Fecha de lanzamiento:</p>
            <p>{fecha.substring(0, 10)}</p>
        </div>
       
        <div className='paginas'>
            <p >Paginas:</p>
            <p>{paginas}</p>
        </div>
        <div className='idioma'>
            <p >Idioma:</p>
            <p>{idioma}</p>
        </div>
        <div className='precio_detalle'>
            <p>Precio:</p>
            <p>{precio}</p>
        </div>
        
        </div>
    </div>
    )
} else {
    return <h1>cargando</h1>
   
}
}

