import { combineReducers } from 'redux';
import user from './user_reducer';

//to combine all  reducer
const rootReducer = combineReducers({
    user,
});

export default rootReducer;