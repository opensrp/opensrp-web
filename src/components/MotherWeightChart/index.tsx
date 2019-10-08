import * as Highcharts from 'highcharts';
import * as React from 'react';
import { Card } from 'reactstrap';
import './index.css';

export default class MotherWeightChart extends React.Component<{}, {}> {
  public componentDidMount() {
    Highcharts.chart('chart-wrapper', {
      chart: {
        type: 'line',
        width: 0.8 * window.innerWidth,
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'middle',
      },
      title: {
        text: "Mother's Weight Tracking",
      },

      subtitle: {
        text: undefined,
      },

      yAxis: {
        title: {
          text: "mother's weight",
        },
      },

      xAxis: {
        type: 'datetime',
        // tslint:disable-next-line: object-literal-sort-keys
        dateTimeLabelFormats: {
          day: '%b %Y',
        },
      },

      series: [
        {
          data: [78, 99, 99, 98, 90, 100, 89, 100],
          name: 'weight',
          pointInterval: 24 * 3600 * 1000,
          pointStart: Date.UTC(2010, 0, 1),
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
              maxWidth: 5000,
            },
          },
        ],
      },
    });
  }
  public render() {
    return (
      <Card>
        <div id="chart-wrapper" />
      </Card>
    );
  }
}
