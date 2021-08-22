import { Route } from "react-router-dom";
import Home from "./components/home/home";
import Details from "./components/details/details";
import NavBar from "./components/navBar/navBar";
import './App.css';
import React from 'react';
import CreateProducto from './components/createProducto/createProducto'
import checkCart from './components/cart/checkCart/checkCart'
import EditProduct from './components/editProducto/editProducto'
import HistoryShopping from './components/historyShopping/historyShopping'
import DetailOrden from './components/historyShopping/detailOrden/detailOrden'


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/' component={Home}/>
      <Route path='/details/:id' component = {Details} />
      <Route path= '/add' component={CreateProducto} />
      <Route path= '/check' component={checkCart} />
      <Route path= '/edit/:id' component={EditProduct} />
      <Route exact path='/ordenes' component={HistoryShopping} />
      <Route path='/ordenes/detail/:id' component={DetailOrden} />
    </div>
  );
}

export default App;
