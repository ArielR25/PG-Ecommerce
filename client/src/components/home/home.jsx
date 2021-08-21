import "./home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getGenders, filterBook, filterClear, url, seeCart } from "../../Actions/index";
import Producto from "../producto/producto";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import undraw from "../../img/undraw.svg"
import gif_carga from "../../img/libros_paginas.gif";
import undraw2 from "../../img/undraw_Gifts.svg"
import { motion } from "framer-motion"

export function Home () {
    const dispatch = useDispatch()
    const filteredAllBooks = useSelector((state) => state.filteredAllBooks);
    useSelector((state) => state.forRender); 
    const genders = useSelector((state) => state.genders);
    const allBooks = useSelector((state) => state.allBooks);

    const [filter, setFilter] = useState([]);

    useEffect(() => {
        dispatch(getAllBooks())
        dispatch(getGenders())
        dispatch(url(window.location.href)) 
        dispatch(seeCart())
    },[dispatch])

//Paginas
var numeroPagina = []
var numerosPaginas = Math.ceil(filteredAllBooks.length / 20)
for (let i = 0; i < numerosPaginas; i++) {
  numeroPagina.push(i)
}
const numberPage = (e) => {
  setCurrentPage(Number(e.target.value) * 20);
  e.preventDefault();
}


  
  const [currentPage, setCurrentPage] = useState(0);
  var librosIniciales =  filteredAllBooks.slice(currentPage, currentPage + 20)
  

  const nextPage = () => {
    setCurrentPage(currentPage + 20);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 20);
  };

  
const typesFilter = (e) => {
      
    setFilter({ ...filter, [e.target.id]: e.target.value });
    dispatch(filterBook(e.target.id));
    setCurrentPage(0)
  };

function categoryClear(e){
    e.preventDefault()
    dispatch(filterClear()) 
}
  //* ANIMACION PARA EL CAROUSEL USANDO LA LIBRERIA FRAMER MOTION
  const majorMotion = {
    hidden: { opacity: 0 },
    visible: {
      display: 'flex',
      opacity: 1,
      transition: {
        staggerChildren: 3,
        delayChildren: 0.3
      }
    }
  }
  const variantMotion = {
    visible: { opacity: 1, x: 0, transition: {
      repeat: Infinity, duration:2, repeatType: "reverse", repeatDelay: 1.5, type: "tween", bounce: 0.50}},
    hidden: { opacity: 0, x: -100,},
  }

  return (
    <div className="home">
        <div className='principalHome'>
        <motion.div variants={majorMotion} initial='hidden' animate='visible' className='carouselMajor'>
                    <motion.div className="carousel" variants={variantMotion}>
          <img src={undraw} alt="imagenPresentacion" className="imagenPresentacion"></img>
          <div className="titulos_carousel">
    <h2>Bienvenido Usuario!!</h2><h4>Compra tus libros esenciales aquí</h4>
      </div>
          </motion.div>
          <motion.div className="carousel" variants={variantMotion}>
          <img src={undraw2} alt="imagenPresentacion" className="imagenPresentacion"></img>
          <div className="titulos_carousel">
    <h2>Regalos por registro</h2><h4>Registrate gratis y obten muchos beneficios</h4>
      </div>
          </motion.div>
          </motion.div>
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
          <button key={gen} id={gen} className="generos" onClick={typesFilter}>{gen}</button>
            )
            )}
          
          </div>
          {filteredAllBooks.length !== allBooks.length ? 
              <button id='cleanButton' className='cleanButton' onClick={categoryClear}>Limpiar filtro</button>
              : null }
          </div>
            <div className="books">
              {!filteredAllBooks.length ? <img className="img_carga" src={gif_carga} alt="Cargando..."/> :(
                librosIniciales.map((e, index) => (
                  <Producto
                    key={index + 1}
                    titulo={e.titulo}
                    img={e.img}
                    autor={e.autor}
                    precio={e.precio}
                    id={e._id}
                    stock={e.stock}
                />)
                ))
              }
            </div>
            
            <div className="btn_page">{numeroPagina.map(e=> {
              return (<button key={e} className={currentPage / 20 === e ? "btn_number_default": "btn_number"} value={e} onClick={numberPage}>{e+1}</button>)
            })}   
          </div>
          </div>
        </div>
      );
}


export default Home;

