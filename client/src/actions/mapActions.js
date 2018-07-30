import { SAVE_CONTINENT, SAVE_YEAR, SAVE_SEARCH_INPUT, SAVE_FESTIVAL_COORDS, SAVE_CURRENT_COORDS, SAVE_RADIUS, DELETE_FESTIVAL_COORDS} from "./types";

export const saveContinent = geography => dispatch => {
    dispatch({
        type: SAVE_CONTINENT,
        payload: geography.properties.continent
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


export const saveFestivalCoords = (coords)=> dispatch => {
    dispatch({
        type: SAVE_FESTIVAL_COORDS,
        payload: coords
    });
}
export const deleteFestivalCoords = () => dispatch => {
    dispatch({
        type: DELETE_FESTIVAL_COORDS,
    });
}

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



