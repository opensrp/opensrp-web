import * as Highcharts from 'highcharts';
import * as React from 'react';
import { Card, CardTitle } from 'reactstrap';
import { clearTimeout, setTimeout } from 'timers';
import { monthNames, MOTHER_WEIGHT_TRACKING } from '../../constants';
import { FlexObject } from '../../helpers/utils';
import { WeightMonthYear } from '../ReportTable';
import './index.css';

interface Props {
  weights: WeightMonthYear[];
  chartWrapperId: string;
}

interface State {
  chart: any;
}

const defaultProps: Props = {
  chartWrapperId: '',
  weights: [],
};
export default class MotherWeightChart extends React.Component<Props, State> {
  public static defaultProps = defaultProps;
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
    }, 300);
    window.addEventListener('resize', () => MotherWeightChart.calcChartWidth(chart));
    this.setState({ chart });
  }

  public componentWillUnmount(): void {
    const self: FlexObject = this;
    if (self.state.chart) {
      window.removeEventListener('resize', () =>
        MotherWeightChart.calcChartWidth(this.state.chart)
      );
      clearTimeout(self.timeout);
    }
  }

  public render() {
    return (
      <Card>
        <CardTitle>{MOTHER_WEIGHT_TRACKING}</CardTitle>
        <div id={`${this.props.chartWrapperId}`} />
      </Card>
    );
  }
}
