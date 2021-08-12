import {categoryFilter, getAllBooks} from "../../Actions/index"
import "./filter.css"
import {connect} from "react-redux";
import React, {useState} from 'react';

export function Filter(props){
    const[books, setBooks] = useState({
        inputCategory:[]
    });

    function handleSubmitCategory(e){
        e.preventDefault()
        props.categoryFilter(books.inputCategory)
    };

    let handleCategory = (e)=> setBooks({...books, inputCategory:e.target.value});

    return(
        <>
            <form className="form1">
            <h1>Filtros</h1>
            <label>Por categoria </label>
        <select className= "select" name='category' onChange={handleCategory} multiple={true} 
        value={books.inputCategory}>
                    <option value="">Categorias</option>
                    <option value="Ficción">Ficción</option>
                    <option value="Poesía">Poesía</option>
                    <option value="Ensayo">Ensayo</option>
                    <option value="Cuento">Cuento</option>
                    <option value="Crónica">Crónica</option>
                    <option value="Novela">Novela</option>
                    <option value="Fantasía">Fantasía</option>
                    <option value="Biografía">Biografía</option>
                    <option value="Auto biografía">Auto biografía</option>
                </select>
        <button className="button" onClick={handleSubmitCategory}>go</button>

            </form> 
        </>
    );
};

function mapStateToProps(state) {
    return {
        actualState: state.filteredAllBooks
    };
} /* hacer con hooks */

    export default connect(mapStateToProps, {categoryFilter, getAllBooks})(Filter); 