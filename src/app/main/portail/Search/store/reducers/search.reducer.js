import * as Actions from '../actions';

const initialState = {
    searchText: '',
    opened: false,
    loading: false,
    suggestions: [],
    noSuggestions: false,
    position: 'header'
};

const searchReducer = function (state = initialState, action) {
    switch (action.type) {
        // ... autres cases existants ...
        
        case Actions.SET_SEARCH_POSITION:
            return {
                ...state,
                position: action.position
            };
            
        default:
            return state;
    }
};

export default searchReducer; 