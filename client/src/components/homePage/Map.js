import React, { Component } from "react";
import { connect } from "react-redux";
import { saveContinent } from "../../actions/saveContinentAction";

import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography
} from "react-simple-maps";

const geographyMap = require("./mapData/world-continents.json");

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto"
};

class Map extends Component {
    render() {
        return (
            <div style={wrapperStyles}>
                <ComposableMap
                    projectionConfig={{
                        scale: 205,
                        rotation: [-11, 0, 0]
                    }}
                    width={980}
                    height={551}
                    style={{
                        width: "100%",
                        height: "auto"
                    }}
                >
                    <ZoomableGroup center={[0, 20]} disablePanning>
                        <Geographies geography={geographyMap}>
                            {(geographies, projection) =>
                                geographies.map(
                                    (geography, i) =>
                                        geography.id !== "ATA" && (
                                            <Geography
                                                onClick={
                                                    this.props.saveContinent
                                                }
                                                key={i}
                                                geography={geography}
                                                projection={projection}
                                                style={{
                                                    default: {
                                                        fill: "#ECEFF1",
                                                        stroke: "#607D8B",
                                                        strokeWidth: 0.75,
                                                        outline: "none"
                                                    },
                                                    hover: {
                                                        fill: "#607D8B",
                                                        stroke: "#607D8B",
                                                        strokeWidth: 0.75,
                                                        outline: "none"
                                                    },
                                                    pressed: {
                                                        fill: "#FF5722",
                                                        stroke: "#607D8B",
                                                        strokeWidth: 0.75,
                                                        outline: "none"
                                                    }
                                                }}
                                            />
                                        )
                                )
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    continent: state.continent.continent
});

export default connect(
    mapStateToProps,
    { saveContinent }
)(Map);
