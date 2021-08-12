import React from "react";
import "./producto.css";
// import { Link } from "react-router-dom";

export default function Producto({ titulo, autor, img, precio }) {
  return (
    <div className="libro">
      <div className="producto">
        <div>
          <h2 className="titulo">{titulo}</h2>
        </div>
        <div>
          {/* <Link to={`/home/pokemon/${id}`}> */}
          <img className="imagen" src={img} alt={titulo}></img>
          {/* </Link> */}
        </div>
        <div>
          <p>{autor}</p>
        </div>
        <div>
          <p>{precio}</p>
        </div>
      </div>
    </div>
  );
}
