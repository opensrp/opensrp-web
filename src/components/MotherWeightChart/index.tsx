import * as Highcharts from 'highcharts';
import * as React from 'react';
import { Card, CardTitle } from 'reactstrap';
import './index.css';

interface Props {
  weights: number[];
}

interface State {
  chart: any;
}
export default class MotherWeightChart extends React.Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState.chart && prevState.chart.series) {
      return {
        chart: prevState.chart.series[0].setData(nextProps.weights),
      };
    } else {
      return {
        chart: prevState.chart,
      };
    }
  }
  constructor(props: Props) {
    super(props);
    // Init state.
    this.state = { chart: {} };
  }
  public componentDidMount() {
    const chart = Highcharts.chart('chart-wrapper', {
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
        text: '',
      },

      subtitle: {
        text: undefined,
      },

      yAxis: {
        title: {
          text: '',
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
          data: this.props.weights,
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
    this.setState({ chart });
  }

  public render() {
    return (
      <Card>
        <CardTitle>Mother's Weight Tracking</CardTitle>
        <div id="chart-wrapper" />
      </Card>
    );
  }
}
