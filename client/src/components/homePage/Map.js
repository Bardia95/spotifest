
import React, { Component } from "react";
import { connect } from "react-redux";
import { saveContinent, saveCurrentCoords, saveRadius } from "../../actions/mapActions.js";
import { southAmericaPath, oceaniaPath, northAmericaPath, europePath, asiaPath, africaPath } from "./mapData/pathData.js"
import classNameToContinent from "./mapData/classNameToContinent.json"



class Map extends Component {

  handleClick = (e) => {
    const continent = classNameToContinent[e.target.id]
    this.props.saveContinent(continent)
    this.props.saveRadius(null)
  }
  continents = [
    {name: "southAmerica", path: southAmericaPath},
    {name: "oceania", path: oceaniaPath},
    {name: "northAmerica", path: northAmericaPath},
    {name: "europe", path: europePath},
    {name: "asia", path: asiaPath},
    {name: "africa", path: africaPath},
  ]

  render() {
    const allPaths = this.continents.map(continent => {
      return (
        <path
          key={continent.name}
          onClick={this.handleClick}
          d={continent.path}
          id={continent.name}
          className={this.props.continent === continent.name ? "selectedContinent" : "not-selected"}>
        </path>)
    })

    return (
      <svg width="980" height="551" viewBox="0 0 980 551" className="rsm-svg " preserveAspectRatio="xMidYMid" >
        <g className="rsm-zoomable-group" transform="translate(
                   519.05
                   337.21
                 )
                 scale(1)
                 translate(-490 -275.5)
               ">
          <rect x="122" y="-74" width="737" height="699" fill="transparent" style={{strokeWidth: 0}}></rect>
          <g className="rsmGeographies">
          {allPaths}
          </g>

        </g>
      </svg>
    )
  }
}

const mapStateToProps = state => ({
    continent: state.map.continent
});

export default connect(
    mapStateToProps,
    { saveContinent, saveCurrentCoords, saveRadius }
)(Map);