import * as Highcharts from 'highcharts';
import * as React from 'react';
import { Card, CardTitle } from 'reactstrap';
import { clearTimeout, setTimeout } from 'timers';
import { monthNames } from '../../constants';
import { FlexObject } from '../../helpers/utils';
import { WeightMonthYear } from '../ReportTable';
import './index.css';

interface Props {
  weights: WeightMonthYear[];
  chartWrapperId: string;
  title: string;
  units: string;
  legendString: string;
  xAxisLabel: string;
}

interface State {
  chart: any;
}

const defaultProps: Props = {
  chartWrapperId: '',
  legendString: '',
  title: '',
  units: '',
  weights: [],
  xAxisLabel: '',
};
export default class WeightAndHeightChart extends React.Component<Props, State> {
  public static defaultProps = defaultProps;
  public static legendString = defaultProps.legendString;
  public static units = defaultProps.units;
  public static xAxisLabel = defaultProps.xAxisLabel;
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
  public static calcChartWidth(chart: any) {
    if (chart && chart.series) {
      chart.setSize(0.8 * window.innerWidth, null);
      return chart;
    }
  }

  constructor(props: Props) {
    super(props);
    // Init state.
    this.state = { chart: null };
  }

  public componentDidMount(): void {
    WeightAndHeightChart.legendString = this.props.legendString;
    WeightAndHeightChart.units = this.props.units;
    WeightAndHeightChart.xAxisLabel = this.props.xAxisLabel;
    let chart: any;
    const self: FlexObject = this;
    if (self.state.chart) {
      self.state.chart.destroy();
    }
    self.timeout = setTimeout(() => {
      chart = Highcharts.chart(`${this.props.chartWrapperId}`, {
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
            return `${WeightAndHeightChart.legendString} - ${(this.x + '').slice(
              0,
              (this.x + '').lastIndexOf(' ')
            )}<br>${WeightAndHeightChart.xAxisLabel}  <b>${this.y}</b> ${
              WeightAndHeightChart.units
            }`;
          },
        },

        subtitle: {
          text: '',
        },

        yAxis: {
          title: {
            text: '',
          },
        },

        xAxis: {
          categories: this.props.weights
            .map((weightMonthYear: WeightMonthYear) => weightMonthYear.month)
            .map((month: number) => monthNames[month])
            .map(
              (mothName: string, index: number) => `${mothName} ${this.props.weights[index].year}`
            ),
        },

        series: [
          {
            data: this.props.weights.map(
              (weightMonthYear: WeightMonthYear) => weightMonthYear.weight
            ),
            name: this.props.xAxisLabel,
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
    }, 300);
    window.addEventListener('resize', () => WeightAndHeightChart.calcChartWidth(chart));
    this.setState({ chart });
  }

  public componentWillUnmount(): void {
    const self: FlexObject = this;
    if (self.state.chart) {
      window.removeEventListener('resize', () =>
        WeightAndHeightChart.calcChartWidth(this.state.chart)
      );
      clearTimeout(self.timeout);
    }
  }

  public render() {
    return (
      <Card>
        <CardTitle>{this.props.title}</CardTitle>
        <div id={this.props.chartWrapperId} />
      </Card>
    );
  }
}
