import "./home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getGenders, filterBook, filterClear, url } from "../../Actions/index";
import Producto from "../producto/producto";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import undraw from "../../img/undraw.svg"


export function Home () {
    const dispatch = useDispatch()
    const filteredAllBooks = useSelector((state) => state.filteredAllBooks);
    const forRender = useSelector((state) => state.forRender); 
    const genders = useSelector((state) => state.genders);
    const allBooks = useSelector((state) => state.allBooks);

    const [filter, setFilter] = useState([]);

    useEffect(() => {
        dispatch(getAllBooks())
        dispatch(getGenders())
        dispatch(url(window.location.href)) 
        dispatch(seeCart())
    },[dispatch])


    const typesFilter = (e) => {
      
      setFilter({ ...filter, [e.target.id]: e.target.value });
      dispatch(filterBook(e.target.id));
    };

  const [currentPage, setCurrentPage] = useState(0);
  var librosIniciales =  filteredAllBooks.slice(currentPage, currentPage + 20)

  const nextPage = () => {
    setCurrentPage(currentPage + 20);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 20);
  };

function categoryClear(e){
    e.preventDefault()
    dispatch(filterClear())
  
}

  return (
    <div className="home">
        <div className='principalHome'>
        <div className="carousel">
          <img src={undraw} alt="imagenPresentacion" className="imagenPresentacion"></img>
          <div className="titulos_carousel">
    <h2>Bienvenido Usuario!!</h2><h4>Compra tus libros esenciales aquí</h4>
      </div>
          </div>
          <div className="e_books"><h1>E-Books</h1></div>
          <div className="paginado">
            {currentPage > 0 ? (
              <button className="botonPrev" onClick={prevPage}>
                <MdKeyboardArrowLeft/>
              </button>
            ) : null}
            {currentPage < filteredAllBooks.length - 20 ? (
              <button className="botonNext" onClick={nextPage}>
                <MdKeyboardArrowRight/>
              </button>
            ) : null}
          </div>
          <div className="botones_generos">
          <div className="box_generos">
            {genders.map((gen) => (
          <button id={gen} className="generos" onClick={typesFilter}>{gen}</button>
            )
            )}
            
          </div>
          {filteredAllBooks.length !== allBooks.length ? 
              <button id='cleanButton' className='cleanButton' onClick={categoryClear}>Limpiar filtro</button>
              : null }
          </div>
          
            <div className="books">
              {librosIniciales.map((e, index) => (
                <Producto
                  key={index + 1}
                  titulo={e.titulo}
                  img={e.img}
                  autor={e.autor}
                  precio={e.precio}
                  id={e._id}
                />
              ))}
            </div>
          </div>
        </div>
      );
}


export default Home;

