import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
// console.log('estado inicial: ', store.getState());
//   store.subscribe(()=>{// esto es para ver el cambio de estado
//     console.log('cambio de estado: ', store.getState());
//   });
