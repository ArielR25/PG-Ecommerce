import React  from 'react'
import CreatableSelect from 'react-select/creatable';




export default function Form ({state, genderAll, handleChange, handleSubmit, handleGenders, processImage, arrGender }) {
    const options = genderAll.map(e=>({ value:e,label:e}))


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
            <div>
               <p>Genero</p>
                <CreatableSelect
                isMulti
                defaultValue={arrGender}
                options={options}
                onChange={(e)=>handleGenders(e)}
                 
                />
            </div> 
            <p>Descripcion</p>
            <textarea type='text' minLength='20' required autoComplete='off' name='descripcion' value={state.descripcion} onChange={(e)=>handleChange(e)}/>
            <div>
                 <label>Fecha de Publicacion</label>
                <input type='date' required autoComplete='off' name='fecha' value={state.fecha} onChange={(e)=>handleChange(e)}/>
                <label>N° Paginas</label>
                <input type='number' min='0' required autoComplete='off' name='paginas' value={state.paginas} onChange={(e)=>handleChange(e)}/>
            </div>
                <p >Imagen</p>
                {state.img && state.img.length >1 &&<img src={state.img} alt='foto de libro'/>}
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
