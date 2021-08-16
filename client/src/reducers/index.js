import {localStore} from './localStoreFunction.js'
import {
    GET_BOOKS,
    FIND_BYCATEGORY,
    DETAILS,
    GET_GENDERS,
    CREATE_GENDER,
    CREATE_BOOK,
    EDIT_BOOK,
    ADD_CART,
    REMOVE_ONE_CART,
    REMOVE_ALL_CART,
    CLEAR_CART,
    ADD_BUY_USER,
    FILTER_CLEAR,
    ORDER_BOOKS,
    FILTER_BOOK,
    SEARCH_BOOK,
    URL,
    SEE_CART
} from '../Actions/index';


const initialState = {
    allBooks: [],
    filteredAllBooks: [],
    filterBooks: [],
    genders:[],
    orderBooks: [],
    details: {},
    cart: {},
    book: undefined,
    url: "",
    forRender:0

};


function rootReducer(state = initialState, action) {


    switch (action.type) {

        case GET_BOOKS:
            return{
                ...state,
                allBooks: action.payload,
                filteredAllBooks: action.payload
            } 

        case FIND_BYCATEGORY:
            
            return{
                ...state,
                filteredAllBooks: state.filteredAllBooks.filter( book => {
                    for( let i=0 ; i<book.generos.length ; i++ ) {
                        for( let j=0 ; j<action.payload.length ; j++ ) {
                            if( book.generos[i] === action.payload[j] ) return true;
                        }
                    }
                    return false;
                })
            }; 

        case FILTER_CLEAR:
                return{
                    ...state,
                    filteredAllBooks: state.allBooks
                } 
            
        case  SEARCH_BOOK:
                return {
                    ...state,
                    filteredAllBooks: state.allBooks.filter( book => {
                        return book.titulo.toString().toLowerCase().includes(action.payload.toLowerCase()) || book.autor.toString().toLowerCase().includes(action.payload.toLowerCase())
                    })
                }
            

        case DETAILS:
            return {
            ...state,
            details: action.payload
        }

        case GET_GENDERS:
            return{
                ...state,
                genders: action.payload
            }

        case CREATE_BOOK:
            return{
                ...state,
                allBooks: [action.payload,...state.allBooks],
                filteredAllBooks: [action.payload,...state.filteredAllBooks]
            }

        case ORDER_BOOKS:
            if (action.payload === "A-Z") {
                return{
                    ...state,
                    forRender:state.forRender+1,
                    filteredAllBooks:state.filteredAllBooks.sort((a, b) => {
                    if (a.titulo < b.titulo) {
                    return -1;
                    }
                    if (a.titulo > b.titulo) {
                    return 1;
                    }
                    return 0;
                })
                }
            }
            if (action.payload === "Z-A") {
                return{
                    ...state,
                    forRender:state.forRender+1,
                    filteredAllBooks:state.filteredAllBooks.sort((b, a) => {
                if (a.titulo < b.titulo) {
                    return -1;
                }
                if (a.titulo > b.titulo) {
                    return 1;
                }
                return 0;
                })
            }
            }
            if (action.payload === "Mayor_Precio") {
                return{
                    ...state,
                    forRender:state.forRender+1,
                    filteredAllBooks:state.filteredAllBooks.sort((b, a) => {
                if (a.precio < b.precio) {
                    return -1;
                }
                if (a.precio > b.precio) {
                    return 1;
                }
                return 0;
                })
            }
            }
            if (action.payload === "Menor_Precio") {
                return{
                    ...state,
                    forRender:state.forRender+1,    
                    filteredAllBooks:state.filteredAllBooks.sort((a, b) => {
                    if (a.precio < b.precio) {
                    return -1;
                }
                if (a.precio > b.precio) {
                    return 1;
                }
                return 0;
                })
            }
            } break

        case CREATE_GENDER:
            return{
                ...state,
                genders:[action.payload, ...state.genders]
            }

        case EDIT_BOOK:
            return{
                ...state,
                allBooks:[action.payload, state.allBooks.filter(e=>e._id !== action.payload._id)],
                filteredAllBooks: [action.payload, state.filteredAllBooks.filter(e=>e._id !== action.payload._id)]

            }

            case ADD_CART:
                const addCart= localStore(action.payload,'add')
                return{
                    ...state,
                    cart: addCart
                }

            case REMOVE_ONE_CART:
                const removeOneCart=localStore(action.payload, 'subtract')
                return{
                    ...state,
                    cart:removeOneCart
                }

            case REMOVE_ALL_CART:
                const removeAllCart = localStore( action.payload, 'delete')
                return{
                    ...state,
                    cart: removeAllCart
                }
            case SEE_CART:
                const seeCart = localStore('see','see')

                return{
                    ...state,
                    cart:seeCart
                }

            case CLEAR_CART:
                const clearCart = localStore( 'clear', 'clear')
                return {
                    ...state,
                    cart: clearCart
                }

            case ADD_BUY_USER:
                const addBuyUser = localStore( 'clear', 'clear')
                return {
                    ...state,
                    cart:addBuyUser
                }   

            case FILTER_BOOK:
                
                return {
                    ...state,
                    filteredAllBooks: state.allBooks.filter((book) => {
                        return book.generos.some((t) => t=== action.payload);
                    }),
                }
                
            case URL:
                return {
                    ...state,
                    url: action.payload
                }       

        default: return state
    }

}

export default rootReducer;
