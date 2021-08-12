import './details.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDetails } from '../../actions';

export function Details( props, myId ) {

    props.getDetails(myId);

    let { titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio } = props.details;

    useEffect( () => {
    },[ props.details ])

    return (
        <div className='details'>
            <h2>{titulo}</h2>
            <h3>{autor}</h3>
            <img src={img} alt={`imagen de portada del libro: ${titulo}`} />
            <div classname='descripcion'>
                <p>Descripción</p>
                <p>{descripcion}</p>
            </div>
            <div className='commontextDetails'>
                <p>Generos:</p>
                <p>{generos}</p>
            </div>
            <div className='commontextDetails'>
                <p>Fecha de lanzamiento:</p>
                <p>{fecha}</p>
            </div>
            <div className='commontextDetails'>
                <p>Editorial:</p>
                <p>{editorial}</p>
            </div>
            <div className='commontextDetails'>
                <p>Paginas:</p>
                <p>{paginas}</p>
            </div>
            <div className='commontextDetails'>
                <p>Idioma:</p>
                <p>{idioma}</p>
            </div>
            <div className='commontextDetails'>
                <p>Precio:</p>
                <p>{precio}</p>
            </div>
            <div className='commontextDetails'>
                <p>Stock:</p>
                <p>{stock}</p>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        details: state.details
    }
}

export default connect( mapStateToProps, { getDetails } )(Details);;