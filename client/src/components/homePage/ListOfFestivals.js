import React, { Component } from "react";
import { connect } from "react-redux";
import countryToContinent from "./mapData/countryToContinent.json"
import Festival from "./Festival.js"
import YearFilter from "./filterOptions/YearFilter.js"
import ContinentFilter from "./filterOptions/ContinentFilter.js"
import SearchFilter from "./filterOptions/SearchFilter.js"
import NearMeFilter from "./filterOptions/NearMeFilter.js"

import Fuse from "fuse.js"
import geolib from "geolib"

class ListOfFestivals extends Component {
  filterByYear = (year, festivals) => {
    if (year !== "") {
      let festivalsInYear = festivals.filter(festival => festival.title.slice(-4) === year)
      return festivalsInYear
    } else {
      return festivals
    }
  }
  filterByContinent = (continent, festivals) => {
    if (continent !== "") {
      let festivalsInContinent = festivals.filter(festival => countryToContinent[festival.country] === this.props.continent)
      return festivalsInContinent
    } else {
      return festivals
    }
  }

  filterBySearch = (searchInput, festivals) => {
    if (searchInput !== "") {
      const options = {
        shouldSort: true,
        threshold: 0.3,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["title", "city","country"]
      };
      const fuse = new Fuse(festivals, options)
      return fuse.search(searchInput)
    } else {
      return festivals
    }
  }
  filterByRadius = (radius, festivalCoords, currentCoords, festivals) => {
    if (radius && festivalCoords.length === festivals.length && currentCoords.latitude && currentCoords.longitude) {
      let festivalsInRadiusIDs = []
      festivalCoords.forEach(fest => {
        if (geolib.isPointInCircle(
          {latitude: fest.latitude, longitude: fest.longitude},
          {latitude: currentCoords.latitude, longitude: currentCoords.longitude},
          radius
        )) {
          festivalsInRadiusIDs.push(fest.festivalID)
        }
      })
      let festivalsNearMe = festivals.filter(festival => festivalsInRadiusIDs.includes(festival.id) )
      return festivalsNearMe
    } else {
      return festivals
    }

  }

  render() {
    let festivals = this.props.festivals
    festivals = this.filterByYear(this.props.year, festivals)
    festivals = this.filterByContinent(this.props.continent, festivals)
    festivals = this.filterBySearch(this.props.searchInput, festivals)
    festivals = this.filterByRadius(this.props.radius, this.props.festivalCoords, this.props.currentCoords, festivals)


    let filteredFestivals = festivals.map(festival => <Festival festival={festival} key={festival.id}/>)

    return (
      <div className="list-of-festivals">
        <h3>Festivals</h3>
        <div className="filter-options">
          {this.props.year !== "" && <YearFilter/>}
          {this.props.continent !== "" && <ContinentFilter/>}
          {this.props.searchInput !== "" && <SearchFilter/>}
          {this.props.radius !== null && <NearMeFilter/>}
        </div>
        {filteredFestivals}
      </div>
    )

  }


}

const mapStateToProps = state => ({
    festivals: state.fetch.festivals,
    continent: state.map.continent,
    year: state.map.year,
    searchInput: state.map.searchInput,
    festivalList: state.map.festivalList,
    radius: state.map.radius,
    festivalCoords: state.map.festivalCoords,
    currentCoords: state.map.currentCoords
});

export default connect(
    mapStateToProps,
    null
)(ListOfFestivals);