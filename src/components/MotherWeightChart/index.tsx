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
          data: [1, 2, 3, 4, 5, 6, 2, 3, 1, 4, 1],
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
