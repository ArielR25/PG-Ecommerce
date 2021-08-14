
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
export const CHECKOUT_CART = 'CHECKOUT_CART';


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

export function getDetails(data){
  return ({
      type: DETAILS,
      payload: data
  })
}

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
    var book= await fetch(`http://localhost:4000/productos/cart/${id}`);
        book= await book.json();
    return dispatch({type:ADD_CART, payload:book})
  };
};

export function removeOneCart(id){
  return {
    type : REMOVE_ONE_CART,
    payload:id
  }
}
export function removeAllCart(id){
  return {
    type : REMOVE_ALL_CART,
    payload:id
  }
}

export function clearCart(){
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

export function checkoutCart(payload) {
  return {
    type : CHECKOUT_CART,
    payload
  }
}


