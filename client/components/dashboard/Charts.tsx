
import * as React from 'react';
import * as Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown';
import * as HighchartsReact from 'highcharts-react-official';
import { formatTime } from '../../helpers/';
import { getDrilldown, prepareData } from '../../helpers/chart';

interface Props {
  dashboard: {
    timestamp: number;
    data: Array<any>;
  };
}

interface State {
  options: any;
}

drilldown(Highcharts);

class Charts extends React.Component<Props, State> {
  state = {
    options: {
      chart: {
        type: 'column'
      },
      yAxis: {
        title: {
          text: 'Hours'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Dashboard data'
      },
      tooltip: {
        formatter() {
          return `<strong>${formatTime(this.y * 3600)}</strong>`;
        }
      },
      ...prepareData(
        this.props.dashboard.data,
        getDrilldown(this.props.dashboard.data)
      )
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.dashboard.timestamp !== this.props.dashboard.timestamp) {
      const drilldownData = getDrilldown(this.props.dashboard.data);
      const prepared = prepareData(this.props.dashboard.data, drilldownData);
      this.setState(state => ({ options: { ...state.options, ...prepared } }));
    }
  }
  render() {
    return (
      <div>
        {/* <HighchartsReact highcharts={Highcharts} options={this.state.options} /> */}
        Charts
      </div>
    );
  }
}

export default Charts;