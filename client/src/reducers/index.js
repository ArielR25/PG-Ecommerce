import {localStore} from './localStoreFunction'
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
    ADD_BUY_USER
} from '../Actions/index';


const initialState = {
  allBooks: [],
  filteredAllBooks: [],
  genders:[],
  details: {},
  cart: {}
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
                filteredAllBooks: state.allBooks.filter(e=> e.generos.includes(action.payload)) 
            } 

        case DETAILS:
            return {
            ...state,
            details: state.allBooks.filter( book => book._id === action.payload)

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
            }
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
                cart: removeOneCart
            }
        case REMOVE_ALL_CART:
            const removeAllCart = localStore( action.payload, 'delete')
            return{
                ...state,
                cart: removeAllCart
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
                cart: addBuyUser
            }       
        default: return state
    }

}

export default rootReducer;
