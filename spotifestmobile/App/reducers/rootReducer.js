import { combineReducers } from "redux";
import fetchReducer from "./fetchReducer";
// import mapReducer from "./mapReducer";
import userReducer from "./userReducer";
// import genreReducer from "./genreReducer"
import filterFestivalReducer from "./filterFestivalReducer";
import artistReducer from "./artistReducer";



export default combineReducers({
    fetch: fetchReducer,
    // map: mapReducer,
    user: userReducer,
    // genre: genreReducer
    filterFestival: filterFestivalReducer,
    artist: artistReducer
});
