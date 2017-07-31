import { combineReducers } from 'redux';


export const initialLocationState = {
    location: null,
    cameFromChildRoute: false,
    prevLocation: null
};

export const location = function location(state = initialLocationState, action) {
    return state;
};

export default combineReducers({
    location
});
