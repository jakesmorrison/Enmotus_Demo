function sparkline(container,name,color) {
  return new Highcharts.Chart({
    chart: {
      borderWidth: 0,
      backgroundColor: null,
      renderTo: container,
      defaultSeriesType: 'areaspline',
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
      enabled: false
    },
    xAxis: {
      title: {
        text: '',
        style: {
          font: 'Roboto Condensed, sans-serif',
          color: '#e0e0e0'
        }

      },
      labels: {
        enabled: false
      },
      minorTickLength: 0,
      tickLength: 0,
      lineWidth: 0,
      minorGridLineWidth: 0,
      gridLineColor: 'transparent',
      lineColor: 'transparent'
    },
    yAxis: {
      max: 35,
      min: 20,
      title: {
        text: 'Latency (µs)',
        margin: 20,
        style: {
          font: 'Roboto Condensed, sans-serif',
          color: '#e0e0e0'
        }

      },
      labels: {
        style: {
          color: '#e0e0e0;',
          fontSize: '0px'
        },
      },
      minorTickLength: 0,
      tickLength: 0,
      lineWidth: 0,
      minorGridLineWidth: 0,
      <!--gridLineColor: 'transparent',-->
      lineColor: 'transparent'
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.75,
        lineWidth: 7,
        marker: {
          enabled: false
        }
      },
      line: {
        lineWidth: 5,
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
      name: name,
      data: [],
      color: color,
    }]
  });
}
