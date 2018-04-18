
function stack_chart(color1,color2,container,ytitle,data,max){
    return new Highcharts.Chart({
      colors: color1,
      chart: {
        renderTo: container,
        type: 'column',
        borderWidth: 0,
        backgroundColor: null
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: [],
        title:{
          style: {
              font: 'Roboto Condensed, sans-serif',
              color: 'white'
            }
        },
       lineWidth: 0,
       minorGridLineWidth: 0,
       lineColor: 'transparent',
       labels: {
           enabled: false
       },
       minorTickLength: 0,
       tickLength: 0
      },
      yAxis: {
        min: 0,
        max: max,
        title: {
          text: ytitle,
          style: {
              font: 'Roboto Condensed, sans-serif',
              color: 'white'
            }
        },
        labels: {
            style: {
              color: 'black;',
              fontSize: '8px'
            },
        },
       lineWidth: 0,
       minorGridLineWidth: 0,
       lineColor: 'transparent',
       labels: {
           enabled: false
       },
       minorTickLength: 0,
       tickLength: 0,
//       gridLineColor: 'transparent'

      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
          borderColor: color2,
          borderWidth: 3,
          stacking: 'normal',
        }
      },
      series: data
    });
}