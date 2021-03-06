import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { formatForTimer } from '../../helpers/';
import TimeAddForm from './TimeAddForm';
import timestorage from '../scripts/timestorage';

class Timer extends React.Component {
  state = {
    seconds: 0,
    date: undefined,
    started: false,
    showForm: false
  };

  timer = null;

  incrementSeconds = () => {
    this.setState(prevState => {
      const now = new Date().getTime();
      return {
        seconds: parseInt((now - prevState.date) / 1000, 10)
      };
    });
  };

  handleStart = () => {
    const now = new Date().getTime();
    this.setState({ started: true, date: now }, () => {
      timestorage.add(this.props.id, this.props.taskName, this.props.project);
      this.incrementSeconds(); // fixes one second delay when first called
      this.timer = setInterval(this.incrementSeconds, 1000);
    });
  };

  handleStop = () => {
    clearInterval(this.timer);
    timestorage.reset();
    const data = {
      seconds: this.state.seconds,
      task: this.props.id,
      done: true,
      project: this.props.project
    };
    this.props.handleAddingTimeLog(data, this.state.seconds);
    this.setState({ started: false, seconds: 0 });
    swal('Good job!', 'Time has been added to your timelog', 'success');
  };

  handleTimer = () => {
    if (!this.state.started) {
      this.handleStart();
    } else {
      this.handleStop();
    }
  };

  formToggle = () => {
    this.setState(state => ({
      showForm: !state.showForm
    }));
  };

  render() {
    const timerButtonString = this.state.started ? 'stop' : 'start';
    const addTimeStrng = this.state.showForm ? 'Cancel' : 'Add Time';
    const time = formatForTimer(this.state.seconds);
    return (
      <div className="timer">
        <div className="timer__buttons">
          <button
            onClick={this.handleTimer}
            className="timer__buttons-item timer__buttons-item--green"
          >
            {timerButtonString}
          </button>
          <button onClick={this.formToggle} className="timer__buttons-item">
            {addTimeStrng}
          </button>
        </div>
        {this.state.showForm ? (
          <TimeAddForm
            addTaskTime={this.props.handleAddingTimeLog}
            name={this.props.taskName}
            task={this.props.id}
            formToggle={this.formToggle}
            project={this.props.project}
          />
        ) : null}

        {this.state.started ? (
          <div className="timer__time">
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
  handleAddingTimeLog: PropTypes.func.isRequired
};

export default Timer;
