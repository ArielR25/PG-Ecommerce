import React,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

import {createProduct} from '../../actions/actions'


export default function Form (){
    const history= useHistory()
    const dispatch = useDispatch()
    const [state, setstate] = useState({
        titulo:'',
        autor:'',
        editorial:'', 
        descripcion:'', 
        fecha:'',
        paginas:'', 
        generos:'',
        img:'',
        idioma:'',
        precio:'',
        stock:''
    })

    function handleChange(e){
        setstate({
            ...state,
            [e.target.name]:e.target.value
        });
    };

    function processImage(e){
        const imageFile = e.target.files[0];
        const imageUrl = new FileReader();
        imageUrl.readAsDataURL(imageFile)
        imageUrl.onload=(e)=>{
           setstate({...state, img: e.target.result})
        };
    };

    function handleSubmit(e){
        e.preventDefault();
        var obj={...state}
        //deberia de aprecer un listado de categories por radio quizas, que le permita elegir cual de las ya creadas y una opcion que sea 'otra'
        //si oprime ese campo, deberia escribir en un input y deberiamos de despachar la accion createGender
        //aca deberia de despacharse la accion createProduct
        // history.push('/') redireccion al home cuando termie puede salir un alert de creado si quieren
        setstate({
            titulo:'',
            autor:'',
            editorial:'', 
            descripcion:'', 
            fecha:'',
            paginas:'', 
            generos:'',
            img:'',
            idioma:'',
            precio:'',
            stock:''
        })    
    };

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <h1>Register new book</h1>
                <p>Titulo</p>
                <input type='text' required  minLength='4' autoComplete='off' name='titulo' value={state.titulo} onChange={(e)=>handleChange(e)}/>
                <p>Autor</p>
                <input type='text' required  minLength="4" autoComplete='off' name='autor' value={state.autor} onChange={(e)=>handleChange(e)}/>
                <p >Editorial</p>
                <input type='text' required  minLength="4" autoComplete='off' name='editorial' value={state.editorial} onChange={(e)=>handleChange(e)}/>
                <p>Genero</p>
                <input type='text' required autoComplete='off' name='generos' value={state.generos} onChange={(e)=>handleChange(e)}/>
                <p>Descripcion</p>
                <textarea type='text' minLength='20' required autoComplete='off' name='descripcion' value={state.descripcion} onChange={(e)=>handleChange(e)}/>
                <div>
                     <label>Fecha de Publicacion</label>
                    <input type='date' required autoComplete='off' name='fecha' value={state.fecha} onChange={(e)=>handleChange(e)}/>
                    <label>N° Paginas</label>
                    <input type='number' min='0' required autoComplete='off' name='paginas' value={state.paginas} onChange={(e)=>handleChange(e)}/>
                </div>
                    <p >Imagen</p>
                    {state.img.length>1 && <img src={state.img} alt='foto de libro'/>}
                    <input type="file" required accept="image/*" onChange={(e)=>processImage(e)}/>
                <div>
                    <p>Idioma</p>
                  <label>En</label><input type='radio' required autoComplete='off' name='idioma' value='en' onChange={(e)=>handleChange(e)}/>
                  <label>Es</label><input type='radio' required autoComplete='off' name='idioma' value='es' onChange={(e)=>handleChange(e)}/>
                </div>
                <p>Precio de Venta</p>
                <input type='number' required min='0' autoComplete='off' name='precio' value={state.precio} onChange={(e)=>handleChange(e)}/>
                <p>Stock</p>
                <input type='number' required min='0' autoComplete='off' name='stock' value={state.stock} onChange={(e)=>handleChange(e)}/>
            </div>
            <button type='submit'>ADD</button>
        </form>
    )
}
