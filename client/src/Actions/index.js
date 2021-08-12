
export const GET_BOOKS = 'GET_BOOKS';
export const FIND_BYCATEGORY = 'FIND_BYCATEGORY';
export const DETAILS = 'DETAILS';
export const GET_GENDERS = 'GET_GENDERS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const CREATE_GENDER = 'CREATE_GENDER';
export const EDIT_BOOK = 'EDIT_BOOK'

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

export function createGender(payload){
    return async function(dispatch) {
        var gender= await fetch('http://localhost:4000/generos',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        const res= await gender.json();
        return dispatch({type:CREATE_GENDER, payload:res})
    };
};

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
