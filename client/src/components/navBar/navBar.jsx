
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getGenders, orderBooks, searchByName, seeCart} from "../../Actions/index";
import './navBar.css'
import {MdMenu, MdShoppingCart, MdAccountCircle} from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom"; 
import Cart from '../cart/cart'



export default function NavBar() {

    const dispatch = useDispatch()
    const orderAllBooks = useSelector((state) => state.filteredAllBooks);
    const url = useSelector((state) => state.url);
    const carts = useSelector((state)=>state.cart)


    useEffect(() => {

        dispatch(getAllBooks())
        dispatch(getGenders())

    },[dispatch])

    let leftBarState = false;

    function leftBarFunction(){
      
      let leftNavBar = document.getElementById('leftNavBar');
      
    
      if( leftBarState ){
        
        leftNavBar.style.left = '-400px';
        leftBarState = false;
      }else{
       
        leftNavBar.style.left = '0px';
        leftBarState = true;
      }
    }
    let rightBarState = false
    function rightBarFunction(){
      
      let rightNavBar = document.getElementById('rightNavBar');
      <Cart/>
    
      if( rightBarState ){
        
        rightNavBar.style.top = '-100vh';
        rightBarState = false;
      }else{
        
        rightNavBar.style.top = '0px';
        rightBarState = true;
      }
    }
    

      //Ordenado

      
  const [state, setState] = useState([]);
  const selectOptionOrder = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  
  useEffect(() => {
          dispatch(orderBooks(state.select, orderAllBooks))
         // eslint-disable-next-line
      }, [state.select])

      //busqueda
      

      const[busqueda, setBusqueda] = useState("")


      const handleChange = e =>{
        setBusqueda(e.target.value)
        dispatch(searchByName(e.target.value));
      }

  


    
  return (
  <div className="nav_principal">
    <div>
    <div className='mainNavBar'>
      {url === "http://localhost:3000/" ? (
         <div>
        <button id='leftNavBarButton' onClick={ leftBarFunction }>
            <MdMenu className="icono_nav"/>
        </button>
            <div id='leftNavBar'>
            <div className="botonesPaginadoOrdenado">
                
                <div className="ordenado">
                    <select id="select" onChange={selectOptionOrder}>
                    <option defaultValue>Ordenar por... </option>
                    <option id="A-Z" value="A-Z">
                        A-Z
                    </option>
                    <option value="Z-A">Z-A</option>

                    <option value="Mayor_Precio">Mayor Precio</option>
                    <option value="Menor_Precio">Menor Precio</option>
                    </select>
                </div>
                </div>
              </div>
            </div>
      ) : null} 
      
                <div className='searchMenu'>
                    
                </div>
    <div className="titulo_principal">
      <NavLink  className="titulo_b" to={'/'}>
      <h1>B-Comm</h1>
      </NavLink>
            
        </div>  
        
        
        <div className="searchBar">
        <BiSearchAlt className="search-btn"/>
        <input className="search-input" type="text" placeholder="Buscar" 
        value={busqueda}
        onChange={handleChange}/>
        </div>
        <div style={{marginLeft:'10%'}}>
          <NavLink to='/add' style={{textDecoration:'none'}}><h3 className="search">Agregar Libro</h3></NavLink>
        </div>
    
        <div className="icono_Usuario">
        <MdAccountCircle/>
        </div>
        
        </div>
            <div id='rightNavBarButton' className="rightNavBarButton" onClick={ rightBarFunction }>
            <MdShoppingCart className="icono_nav_der"/> <span className="numero_icono">{Object.values(carts).length}</span>
  
            </div>           
            <div id ="rightNavBar">
              <Cart/>
            </div>
        </div>
  
    </div> 
  );
}
