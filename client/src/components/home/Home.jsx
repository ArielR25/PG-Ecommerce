import "./home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../Actions";
import Producto from "../producto/producto";
import Filter from '../filter/filter';

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
  );
}


export default Home;

