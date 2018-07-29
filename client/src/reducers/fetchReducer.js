import { FETCH_ARTISTS, FETCH_FESTIVALS } from "../actions/types";

const initialState = {
    artists: [],
    festivals: [],
    filteredFestivals: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_ARTISTS:
            return {
                ...state,
                artists: action.payload
            };
        case FETCH_FESTIVALS:
            return {
                ...state,
                festivals: action.payload,
                filteredFestivals: action.payload
            };
        default:
            return state;
    }
}
