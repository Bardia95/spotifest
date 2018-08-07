import {
    SAVE_SEARCH_INPUT,
    SELECT_ALL_FESTIVALS
} from "../actions/types";

const initialState = {
    filters: [],
    filteredFestivals: [],
    allFestivals: [],
};

const availableFilters = {
  year: (festivals, year) => festivals.filter(festival => festival.title.slice(-4) === year),
  continent: (festivals, continent) => festivals.filter(festival => festival.continent === continent),
  search: (festivals, searchInput) => {
    const re = new RegExp(searchInput, "i")
    const filteredFests = festivals.filter(festival => re.test(festival.title))
    return filteredFests
  },
}

const filterFestivals = (allFestivals, filters) => {
  return filters.reduce( (filteredFestivals, filter) => {
    const {type, args} = filter
    return availableFilters[type](filteredFestivals, args)
  }, allFestivals)
}

export default function(state = initialState, action) {
  switch (action.type) {
    // case SAVE_YEAR:
    //   if (action.payload) {
    //     if (state.filters.filter(f => f.type === "year").length > 0) {
    //       let filters = state.filters.filter( f => f.type !== "year")
    //       filters = [...filters, {type: "year", args: action.payload}]
    //       const filteredFestivals = filterFestivals(state.allFestivals, filters)
    //       return {...state, filteredFestivals, filters}
    //     }
    //     const filters = [...state.filters, {type: "year", args: action.payload}]
    //     const filteredFestivals = filterFestivals(state.allFestivals, filters)
    //     return {...state, filteredFestivals, filters}
    //   } else {
    //     const filters = state.filters.filter( f => f.type !== "year")
    //     const filteredFestivals = filterFestivals(state.allFestivals, filters)
    //     return {...state, filteredFestivals, filters}
    //   }
    // case SAVE_CONTINENT:
    //   if (action.payload) {
    //     if (state.filters.filter(f => f.type === "continent").length > 0) {
    //       let filters = state.filters.filter( f => f.type !== "continent")
    //       filters = [...filters, {type: "continent", args: action.payload}]
    //       const filteredFestivals = filterFestivals(state.allFestivals, filters)
    //       return {...state, filteredFestivals, filters}
    //     }
    //     const filters = [...state.filters, {type: "continent", args: action.payload}]
    //     const filteredFestivals = filterFestivals(state.allFestivals, filters)
    //     return {...state, filteredFestivals, filters}
    //   } else {
    //     const filters = state.filters.filter( f => f.type !== "continent")
    //     const filteredFestivals = filterFestivals(state.allFestivals, filters)
    //     return {...state, filteredFestivals, filters}
    //   }
    case SAVE_SEARCH_INPUT:
      if (action.payload) {
        if (state.filters.filter(f => f.type === "search").length > 0) {
          let filters = state.filters.filter(f=> f.type !== "search")
          filters = [...filters, {type: "search", args: action.payload}]
          const filteredFestivals = filterFestivals(state.allFestivals, filters)
          return {...state, filteredFestivals, filters}
        }
        const filters = [...state.filters, {type: "search", args: action.payload}]
        const filteredFestivals = filterFestivals(state.allFestivals, filters)
        return {...state, filteredFestivals, filters}
      } else {
        const filters = state.filters.filter( f => f.type !== "search")
        const filteredFestivals = filterFestivals(state.allFestivals, filters)
        return {...state, filteredFestivals, filters}
      }
    case SELECT_ALL_FESTIVALS:
      return {
          ...state,
          allFestivals: action.payload,
          filteredFestivals: action.payload
      }
    default:
      return state;
  }


}