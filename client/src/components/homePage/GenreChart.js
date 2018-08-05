import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar } from 'react-chartjs-2';


class GenreChart extends Component {
  getLabelsAndData = (sumsArr) => {
    let labels = []
    let data = []
    if (sumsArr.length > 5) {
      for (let i = 0; i < 5; i++) {
        labels.push(sumsArr[i][0])
        data.push(sumsArr[i][1])
      }
    }
    return {labels, data}
  }

  render() {
    const dataObj = this.getLabelsAndData(this.props.festivalGenresSum)
    const data = {
      labels: dataObj.labels,
      datasets: [
        {
          label: 'Number of Artists',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: dataObj.data,
        },
      ]
    };
    const chartOptions = {
      maintainAspectRatio: false,
      responsive: false,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
              beginAtZero:true,
              min: 0,
          },
          scaleLabel: {display: true,labelString: "# of Artists"}
        }],
      }
    }
    const festivalName = ""

    return (
      <div className="barChart col-md-6">
        {this.props.festivalSelected &&
          <div >
            <p>{this.props.festivalSelected.title} Top Genres</p>
            <Bar
              height={550}
              width={600}
              data={data}
              options= {chartOptions}
            />
          </div>
        }
      </div>

    );
  }
}

const mapStateToProps = state => ({
  festivalGenres: state.genre.festivalGenres,
  festivalGenresSum: state.genre.festivalGenresSum,
  festivalSelected: state.user.festivalSelected
});

export default connect(
  mapStateToProps,
  null
)(GenreChart);
