import { SAVE_CONTINENT,
    SAVE_YEAR,
    SAVE_SEARCH_INPUT,
    SAVE_CURRENT_COORDS,
    SAVE_RADIUS,
    SELECT_ALL_FESTIVALS,
} from "./types";
import axios from "axios"

export const saveContinent = continent => dispatch => {
    dispatch({
        type: SAVE_CONTINENT,
        payload: continent
    });
};

export const saveYear = (year) => dispatch => {
    dispatch({
        type: SAVE_YEAR,
        payload: year
    });
};

export const saveSearchInput = (searchInput) => dispatch => {
    dispatch({
        type: SAVE_SEARCH_INPUT,
        payload: searchInput
    });
};


export const saveCurrentCoords = (coords)=> dispatch => {
    dispatch({
        type: SAVE_CURRENT_COORDS,
        payload: coords
    });
}

export const saveRadius = (radius)=> dispatch => {
    dispatch({
        type: SAVE_RADIUS,
        payload: radius
    });
}

export const selectAllFestivals = () => dispatch => {
    axios.get("/api/v1/festivals").then(response => {
        dispatch({
            type: SELECT_ALL_FESTIVALS,
            payload: response.data
        });
    });
};







