import React  from 'react'
import CreatableSelect from 'react-select/creatable';
import './form.css'

export default function Form ({state, genderAll, handleChange, handleSubmit, handleGenders, processImage}) {
    const options = genderAll.map(e=>({ value:e,label:e}))
    return (
        <form onSubmit={(e)=>handleSubmit(e)} className='form'>
        <div className='cuerpo_form'>
            <div className='primer_form'>
                <h1 className='titulo-form'>Register new book</h1>
                    <p>Titulo</p>
                    <input className='inputsFom' type='text' required  minLength='4' autoComplete='off' name='titulo' value={state.titulo} onChange={(e)=>handleChange(e)}/>     

                    <p>Autor</p>
                    <input className='inputsFom' type='text' required  minLength="4" autoComplete='off' name='autor' value={state.autor} onChange={(e)=>handleChange(e)}/>

                    <p >Editorial</p>
                    <input className='inputsFom' type='text' required  minLength="4" autoComplete='off' name='editorial' value={state.editorial} onChange={(e)=>handleChange(e)}/>

            </div>
            <div className='segundo_form'>
               <p>Genero</p>
                <CreatableSelect
                className='inputsFom'
                isMulti
                options={options}
                onChange={(e)=>handleGenders(e)}       
                />
            </div> 
            <div className='tercero_form'>
                <p>Descripcion</p>
                <textarea className='inputsFom' type='text' minLength='20' required autoComplete='off' name='descripcion' value={state.descripcion} onChange={(e)=>handleChange(e)}/>
            </div>
            <div className='cuarto_form'>
                <label>Fecha de Publicacion</label>
                <input className='inputsFom' type='date' required autoComplete='off' name='fecha' value={state.fecha} onChange={(e)=>handleChange(e)}/>
            </div>
            <div className='quinto_form'>
                 <label>N° Paginas</label>
                <input className='inputsFom' type='number' min='0' required autoComplete='off' name='paginas' value={state.paginas} onChange={(e)=>handleChange(e)}/>
            </div>
            <div className='sexto_form'>
                <p >Imagen</p>
                {state.img && state.img.length >1 &&<img src={state.img} alt='foto de libro'/>}
                <input  type="file" required accept="image/*" onChange={(e)=>processImage(e)}/>             
            </div>
            <div className='septimo_form'>
                <p>Idioma</p>
                <label>En</label><input type='radio' required autoComplete='off' name='idioma' value='en' onChange={(e)=>handleChange(e)}/>
                <label>Es</label><input type='radio' required autoComplete='off' name='idioma' value='es' onChange={(e)=>handleChange(e)}/>
            </div>
            <div className='primer_form'>
                <p>Precio de Venta</p>
                <input className='inputsFom' type='number' required min='0' autoComplete='off' name='precio' value={state.precio} onChange={(e)=>handleChange(e)}/>
                <p>Stock</p>
                <input className='inputsFom' type='number' required min='0' autoComplete='off' name='stock' value={state.stock} onChange={(e)=>handleChange(e)}/>
            </div>
        </div>
        <button type='submit'>ADD</button>
    </form>
    )
}
