import {
    GET_BOOKS,
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
    var {type, payload}= action;
    switch (type) {
        case GET_BOOKS:
            return{
                ...state,
                allBooks: payload,
                filteredAllBooks: payload
            }
        case GET_GENDERS:
            return{
                ...state,
                genders: payload
            }
        case CREATE_BOOK:
            return{
                ...state,
                allBooks: [payload,...state.allBooks],
            }
        case CREATE_GENDER:
            return{
                ...state,
                genders:[payload, ...state.genders]
            }
        case EDIT_BOOK:
            return{
                ...state,
                allBooks:[payload, state.allBooks.filter(e=>e._id !== payload._id)],
                filteredAllBooks: [payload, state.filteredAllBooks.filter(e=>e._id !== payload._id)]
            }
        default: return state
    }
}

export default rootReducer;