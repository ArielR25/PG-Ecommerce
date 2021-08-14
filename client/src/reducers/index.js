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
    ADD_BUY_USER,
    CHECKOUT_CART
} from '../Actions/index';


const initialState = {
  allBooks: [],
  filteredAllBooks: [],
  genders:[],
  details: {},
  cart: {   
        af503fcdf4238445cc8:{
            generos: [
                "Psicología"
            ],
            _id: "61140ae8af17563824915d08",
            titulo: "Las fuerzas morales",
            autor: "Jose Ingenieros",
            editorial: "NoBooks Editorial",
            descripcion: "Estamos especializados en publicar textos en español. Para encontrar mas títulos busque “NoBooks Editorial” o visite nuestra web http://www.nobooksed.com Contamos con mas volúmenes en español que cualquier otra editorial en formato electrónico y continuamos creciendo.",
            fecha: "2011-11-01T03:00:00.000Z",
            paginas: 166,
            img: "http://books.google.com/books/content?id=tetSDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            idioma: "es",
            precio: 169.72,
            __v: 0,
            stock: 76
        },
    af503fcdf4238445cc9: {
      generos: [
            "Psicología"
        ],
        _id: "61140af503fcdf4238445cc9",
        titulo: "La locura en la argentina",
        autor: "Jose Ingenieros",
        editorial: "NoBooks Editorial",
        fecha: "1937-01-01T03:00:00.000Z",
        paginas: 196,
        img: "http://books.google.com/books/content?id=jTxDDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        idioma: "es",
        precio: 169.72,
        __v: 0,
        stock: 45
    }   
   },
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
        case  CHECKOUT_CART:
            return{
                ...state,
                cart: {...state.cart, direccion : action.payload}
            }      
        default: return state
    }

}

export default rootReducer;
