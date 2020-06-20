//here is the place , change the state of an appliation, bcz state is immutable
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER
   // ON_SUCCESS_BUY_USER
} from '../_actions/types';


//The state can only be changed by emitting an action.
// The state tree is never mutated directly instead you use pure functions called reducers. 
//A reducer takes the current state tree and an action as arguments and returns the resulting (to execute the next state)state tree.
export default function (state = {}, action) {
    
    switch (action.type) {
        //the action type for user register is REGISTER_USER
        case REGISTER_USER:
            //previousState + action = new state
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, successLogin: action.payload, isAdmin: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case ADD_TO_CART_USER:
            return {
                ...state, userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }
            
        case GET_CART_ITEMS_USER:
            return {
                ...state, cartDetail: action.payload
            }

        case REMOVE_CART_ITEM_USER:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }

            }
       

        default:
            return state;
    }
}