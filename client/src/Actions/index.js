export const GET_BOOKS = 'GET_BOOKS';
export const FIND_BYCATEGORY = 'FIND_BYCATEGORY';
export const DETAILS = 'DETAILS';
export const GET_GENDERS = 'GET_GENDERS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const CREATE_GENDER = 'CREATE_GENDER';
export const EDIT_BOOK = 'EDIT_BOOK'
export const ADD_CART = 'ADD_CART';
export const REMOVE_ONE_CART = 'REMOVE_ONE_CART';
export const REMOVE_ALL_CART = 'REMOVE_ALL_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_BUY_USER = 'ADD_BUY_USER';
export const FILTER_CLEAR =   'FILTER_CLEAR'
export const ORDER_BOOKS =   'ORDER_BOOKS'
export const FILTER_BOOK = 'FILTER_BOOK'
export const SEARCH_BOOK = 'SEACRH_BOOK'
export const URL = "URL";
export const CHECKOUT_CART = 'CHECKOUT_CART';
export const SEE_CART = 'SEE_CART'


export function getAllBooks(){
    return function(dispatch){
        return fetch(`http://localhost:4000/productos`)
        .then(response=> response.json())
        .then(json=>{
            dispatch({
            type:GET_BOOKS,
            payload:json
            })
        });
}};

export function getGenders(){
  return async function(dispatch) {
      var genders= await fetch('http://localhost:4000/generos');
          genders= await genders.json();
      return dispatch({type:GET_GENDERS, payload:genders})
  };
};

export function createBook(payload){
  return async function (dispatch){
      var book= await fetch('http://localhost:4000/productos',{
          method: 'POST',
          headers:{
              'Accept': 'application/json',
              'Content-type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(payload)
      })
      const res= await book.json();
      return dispatch ({type: CREATE_BOOK, payload:res});
  };
};



export function categoryFilter(generos){
  return{
      type: FIND_BYCATEGORY,
      payload:generos
      
  };
};


export function filterClear(){
  return{
    type:FILTER_CLEAR
  }; 
};

export function searchByName(titulo){
  return{
    type: SEARCH_BOOK,
    payload: titulo
  }
}

export function getDetails(id){
  return function(dispatch){
    return fetch(`http://localhost:4000/productos/${id}`)
      .then(response => response.json())
      .then(data =>{
        dispatch({
          type: DETAILS,
          payload: data
        })
      });
  }
};
export function createGender(payload) {
  return async function (dispatch) {
    var gender = await fetch("http://localhost:4000/generos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    const res = await gender.json();
    return dispatch({ type: "CREATE_GENDER", payload: res });
  };
}

export function editBook(payload,id){
  return async function(dispatch) {
      var book= await fetch(`http://localhost:4000/productos/edit/${id}`,{
          method: 'PUT',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
      });
      const res= await book.json();
      return dispatch({type: EDIT_BOOK, payload:res})
  };
};

export function addCart (id){
  return async function(dispatch) {
    var book= await fetch(`http://localhost:4000/cart/${id}`);
        book= await book.json();
    return dispatch({type:ADD_CART, payload:book})
  };
};

export function seeCart(){
  return{
    type: SEE_CART
  }
}

export function orderBooks(orden ) {
  
  return {
    type : ORDER_BOOKS,
    payload: orden
  }
}

export function removeOneCart(id){
  return async function (dispatch){
    var removeOne= await fetch(`http://localhost:4000/cart/removeOne/${id}`);
    removeOne= await removeOne.json();
    return dispatch({type:REMOVE_ONE_CART, payload:removeOne})
  };
}
export function removeAllCart(id,count){
  return async function (dispatch){
    var removeAll= await fetch(`http://localhost:4000/cart/removeAll/${id}/${count}`);
    removeAll= await removeAll.json();
    return dispatch({type:REMOVE_ALL_CART, payload:removeAll})
  };
}

export function clearCart(payload){

  return {
    type : CLEAR_CART
  }
}

export function addBuyUser (payload){
  return async function (dispatch) {
    await fetch ('http://localhost:4000/productos/cart/', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    return dispatch ({type: ADD_CART})
  };
};


export function filterBook(genero) {
  return {
    type: FILTER_BOOK,
    payload: genero,
  }
}

export function url(url) {
  return {
    type: URL,
    payload: url,
  }
}