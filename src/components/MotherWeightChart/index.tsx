import * as Highcharts from 'highcharts';
import * as React from 'react';

export default class MotherWeightChart extends React.Component<{}, {}> {
  public componentDidMount() {
    Highcharts.chart('container', {
      legend: {
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'middle',
      },
      title: {
        text: 'Solar Employment Growth by Sector, 2010-2016',
      },

      subtitle: {
        text: 'Source: thesolarfoundation.com',
      },

      yAxis: {
        title: {
          text: 'Number of Employees',
        },
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },

      series: [
        {
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
          name: 'Installation',
          type: undefined,
        },
      ] as any,

      responsive: {
        rules: [
          {
            chartOptions: {
              legend: {
                align: 'center',
                layout: 'horizontal',
                verticalAlign: 'bottom',
              },
            },
            condition: {
              maxWidth: 500,
            },
          },
        ],
      },
    });
  }
  public render() {
    return <div id="container" />;
  }
}
