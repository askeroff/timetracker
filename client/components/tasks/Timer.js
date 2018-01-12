import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { formatTime } from '../../helpers/';
import TimeAddForm from './TimeAddForm';
import timestorage from '../scripts/timestorage';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      started: false,
      showForm: false,
    };
    this.handleTimer = this.handleTimer.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleAddingTime = this.handleAddingTime.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.incrementSeconds = this.incrementSeconds.bind(this);
    this.timer = null;
  }

  incrementSeconds() {
    this.setState({
      seconds: this.state.seconds + 1,
    });
  }

  handleStart() {
    this.setState({ started: true });
    timestorage.add(this.props.id);
    this.incrementSeconds(); // fixes one second delay when first called
    this.timer = setInterval(this.incrementSeconds, 1000);
  }

  handleStop() {
    clearInterval(this.timer);
    timestorage.reset();
    const data = {
      seconds: this.state.seconds,
      name: this.props.taskName,
      task: this.props.id,
      done: true,
      project: this.props.project,
    };
    this.props.handleAddingTimeLog(data, this.state.seconds);
    this.setState({ started: false, seconds: 0 });
    swal('Good job!', 'Time has been added to your timelog', 'success');
  }

  handleTimer() {
    if (!this.state.started) {
      this.handleStart();
    } else {
      this.handleStop();
    }
  }

  handleAddingTime() {
    this.setState(state => ({
      showForm: !state.showForm,
    }));
  }

  render() {
    const timerButtonString = this.state.started ? 'stop' : 'start';
    const addTimeStrng = this.state.showForm ? 'Cancel' : 'Add Time';
    const time = formatTime(this.state.seconds);
    return (
      <div className="timer">
        <div>
          <button
            onClick={this.handleTimer}
            className="timer__button timer__button--green"
          >
            {timerButtonString}
          </button>
          <button onClick={this.handleAddingTime} className="timer__button">
            {addTimeStrng}
          </button>
        </div>
        {this.state.showForm ? (
          <TimeAddForm
            addTime={this.props.handleAddingTimeLog}
            name={this.props.taskName}
            task={this.props.id}
            project={this.props.project}
          />
        ) : null}

        {this.state.started ? (
          <div className="timer-item">
            <span>{time}</span>
          </div>
        ) : null}
      </div>
    );
  }
}

Timer.propTypes = {
  taskName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  handleAddingTimeLog: PropTypes.func.isRequired,
};

export default Timer;
