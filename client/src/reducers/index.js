import {
    GET_BOOKS,
    FIND_BYCATEGORY,
    DETAILS,
    GET_GENDERS,
    CREATE_GENDER,
    CREATE_BOOK,
    EDIT_BOOK
} from '../Actions/index';

const initialState = {
    allBooks: [],
    filteredAllBooks: [],
    genders:[],
    details: {}
}

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
                filteredAllBooks: state.filteredAllBooks.filter(book =>{

                    for( let i=0 ; i < book.generos.length ; i++ ) {
                        for( let j=0 ; j < action.payload.length ; j++ ) {
                            if( book.generos[i] === action.payload[j] ) return true;
                        }
                    }
                    return false;
                })
        }; 
        case DETAILS:

            return {
            ...state,
            details: allBooks.filter( book => book._id === action.payload)

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
        default: return state
    }
}

export default rootReducer;