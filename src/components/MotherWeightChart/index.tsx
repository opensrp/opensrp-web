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
      // tslint:disable-next-line: object-literal-sort-keys
      tooltip: {
        backgroundColor: 'white',
        borderColor: '#DADCE0',
        borderRadius: 10,
        borderWidth: 1,
        shadow: {
          color: '#D7D7E0',
          offsetX: 0,
          offsetY: 2,
          opacity: 0.2,
          width: 8,
        },
        formatter() {
          return `Mother's weight - ${this.x}<br> weight <b>${this.y}</b>`;
        },
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
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },

      series: [
        {
          data: this.props.weights,
          name: 'weight',
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

  private calcChartWidth() {
    const chart = this.state.chart;
    this.setState({});
  }
}
