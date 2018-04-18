function speedometer_chart(container,color1,color2){
    return new Highcharts.Chart({
        chart: {
            borderWidth: 0,
            backgroundColor: null,
            renderTo: container,
        },
        title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            style: {
                color: color1,
                fontSize:'25px',
                font: 'Roboto Condensed, sans-serif',
            },
            floating: true,
            y: 70
        },
        exporting: { enabled: false },
        credits: {enabled: false},
        tooltip: { enabled: false },
        plotOptions: {
            pie: {
                colors: [color1, "rgba(0, 0, 0, 0)"],
                borderColor: color2,
                borderWidth: 3,
                dataLabels: {
                    enabled: false,
                },
                startAngle: -105,
                endAngle: 105,
                center: ['50%', '75%'],
            }
        },
        series: [{
            type: 'pie',
            innerSize: '50%',
            data: [
                ['Firefox',   75],
                ['Opera',     25],
                {
                    y: 0.2,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
    });
}