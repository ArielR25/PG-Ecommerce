import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllBooks, getGenders, filterBook, filterClear} from "../../Actions/index";
import { useCambio } from "../../reducers/Orden&Cambios";

import Producto from "../producto/producto";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import undraw from "../../img/undraw.svg"
import "./home.css";

export function Home () {

  const dispatch = useDispatch()
  var filteredAllBooks = useSelector((state) => state.filteredAllBooks);

  const cambios = useSelector ((state)=>state.cambios)
  const genders = useSelector((state) => state.genders)

  const [librosIniciales, setlibrosIniciales]=useState(0)
  const [currentPage, setCurrentPage] = useState(0);

  const card= 20
  const cambiar= useCambio()

  useEffect(() => {
      dispatch(getAllBooks())
      dispatch(getGenders())
  },[dispatch])

  useEffect(() => {
    setlibrosIniciales([...filteredAllBooks].splice(0,20))
  }, [filteredAllBooks,cambios])

  useEffect(() => {
    filteredAllBooks=cambiar
  }, [cambios]);

  const typesFilter = (e) => {
    dispatch(filterBook(e.target.id));
  };

  const nextPage = () => {
    const totalElementos= filteredAllBooks.length
    const next= currentPage +1
    const index= next * card

    if(index>=totalElementos) return;

    setlibrosIniciales([...filteredAllBooks].splice(index,card))
    setCurrentPage(next)
  };
  const prevPage = () => {
    const prev= currentPage-1

    if(prev < 0) return;

    const index= prev * card

    setlibrosIniciales([...filteredAllBooks].splice(index,card))
    setCurrentPage(prev)
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
            {currentPage < 80 ? (
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
              <button id='cleanButton' className='cleanButton' onClick={categoryClear}>Limpiar filtro</button>
          </div>
            <div className="books">
              {librosIniciales.length>0 &&  librosIniciales.map((e, index) => (
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

