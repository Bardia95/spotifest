import React, { Component } from "react";
import { connect } from "react-redux";
import Select from 'react-select';
import { saveYear } from '../../actions/mapActions.js'



class YearSelect extends Component {
  handleYearChange = (selectedOption) => {
    this.props.saveYear(selectedOption.value)
  }


  render() {
    const years = this.props.festivals.map(festival => festival.title.slice(-4))
                              .filter((elem, pos, arr) => {
                                return arr.indexOf(elem) === pos;
                              });
    return (
      <Select
        className="col-md-4 select-year-container"
        placeholder="Select a year..."
        classNamePrefix="select-year"
        value={this.props.year}
        onChange={this.handleYearChange}
        options={years.map(year => ({value: year, label: year}))}
      />

    )

  }


}

const mapStateToProps = state => ({
    year: state.map.year,
    festivals: state.fetch.festivals
});

export default connect(
    mapStateToProps,
    { saveYear }
)(YearSelect);