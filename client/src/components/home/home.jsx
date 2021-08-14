import "./home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../Actions/index";
import Producto from "../producto/producto";
import Filter from '../filter/filter';
import toRight from '../../img/toRight.png';
import toLeft from '../../img/toLeft.png';

let leftBarState = false;

function leftBarFunction(){
  
  let leftNavBar = document.getElementById('leftNavBar');
  let leftNavIcon = document.getElementById('leftNavIcon');

  if( leftBarState ){
    leftNavIcon.src = toRight;
    leftNavBar.style.left = '-400px';
    leftBarState = false;
  }else{
    leftNavIcon.src = toLeft;
    leftNavBar.style.left = '0px';
    leftBarState = true;
  }
}

export function Home () {
    const dispatch = useDispatch()
    const filteredAllBooks = useSelector((state) => state.filteredAllBooks);
    useEffect(() => {
        dispatch(getAllBooks())
    },[dispatch])

  const [currentPage, setCurrentPage] = useState(0);
  var librosIniciales = filteredAllBooks.slice(currentPage, currentPage + 20);

  const nextPage = () => {
    setCurrentPage(currentPage + 20);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 20);
  };

  return (
    <div className='principalHome'>
      <div className='mainNavBar'>
        <button id='leftNavBarButton' className='leftNavBarButton' onClick={ leftBarFunction }>
          <img id='leftNavIcon' src={toLeft} alt="panel dysplay icon" />
        </button>
        <div id='leftNavBar' className='leftNavBar'>
          
          <p>soy el leftNavBar div</p>
        </div>
        <div className='searchMenu'>
          <p>soy el primer div</p>
        </div>
        <div className='rightNavBar'>
          <p>soy rightNavBar</p>
        </div>
      </div>
      <div className="home">
        <Filter/>
        <div className="paginado">
          {currentPage > 0 ? (
            <button className="botonPrev" onClick={prevPage}>
              Prev Page
            </button>
          ) : null}
          {currentPage < 80 ? (
            <button className="botonNext" onClick={nextPage}>
              Next Page
            </button>
          ) : null}
        </div>

        <div className="books">
          {librosIniciales.map((e, index) => (
            <Producto
              key={index + 1}
              titulo={e.titulo}
              img={e.img}
              autor={e.autor}
              precio={e.precio}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export default Home;

