function spline_chart(color1, color2, container, ytitle, data) {
  return new Highcharts.Chart({
    chart: {
      borderWidth: 0,
      backgroundColor: null,
      renderTo: 'container',
      defaultSeriesType: 'spline',
    },
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    title: {
      text: ''
    },
    legend: {
      itemStyle: {
        font: 'Arial, Helvetica, sans-serif',
        color: '#2C2C2E'
      },
      layout: 'horizontal',
      //align: 'right',
      //verticalAlign: 'top',
      floating: false,
      //y: -30,
    },
    xAxis: {
      title: {
        text: '',
        style: {
          font: 'Arial, Helvetica, sans-serif',
          color: '#2C2C2E'
        }

      },
      labels: {
        enabled: false
      },
      minorTickLength: 0,
      tickLength: 0,
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent'
    },
    yAxis: {
      //max: 2500000,
      min: 0,
      title: {
        text: '',
        margin: 0,
        style: {
          font: 'Arial, Helvetica, sans-serif',
          color: '#2C2C2E'
        }

      },
      labels: {

        formatter: function() {
          val = this.value;
          return '' + val.toLocaleString() + '';
        },
        style: {
          font: 'Arial, Helvetica, sans-serif',
          color: '#2C2C2E;',
          fontSize: '16px'
        },
      },
      minorTickLength: 0,
      tickLength: 0,
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent'
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.75,
        lineWidth: 10,
        marker: {
          enabled: false
        }
      },
      spline: {
        lineWidth: 7,
        marker: {
          enabled: false
        }
      },
      series: {
        marker: {
          states: {
            hover: {
              enabled: false
            }
          }
        }
      }
    },
    series: [{
      name: 'NVDIMM',
      data: [],
      color: '#0077C8',
//      fillColor: {
//        linearGradient: {
//          x1: 0,
//          y1: 0,
//          x2: 0,
//          y2: 1
//        },
//        stops: [
//          [0, "rgb(98, 157, 55)"],
//          [1, "rgba(98, 157, 55, 0)"]
//        ]
//      },

    }, {
      name: 'NVME',
      data: [],
      color: '#9ACA3C',
//      fillColor: {
//        linearGradient: {
//          x1: 0,
//          y1: 0,
//          x2: 0,
//          y2: 1
//        },
//        stops: [
//          [0, Highcharts.getOptions().colors[0]],
//          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
//        ]
//      },

    }]
  });
}

