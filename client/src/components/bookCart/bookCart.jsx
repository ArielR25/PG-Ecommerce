import React from "react";

export default function BookCart({ titulo, autor, img, precio, count }) {
    
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
        <p>{count}</p>
    </div>
  );
}
