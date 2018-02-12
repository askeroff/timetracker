import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../../helpers';

const MotivationBlock = props => {
  let thisWeekString = '';

  const { dashboardData, projectId } = props;
  if (dashboardData.lastWeek && dashboardData.lastWeek.length !== 0) {
    const lastWeek = dashboardData.lastWeek.find(item => item.id === projectId);
    const thisWeek = dashboardData.thisWeek.find(item => item.id === projectId);
    if (thisWeek !== undefined && lastWeek !== undefined) {
      const diff = lastWeek.time - thisWeek.time - props.seconds;
      if (diff < 0) {
        thisWeekString = (
          <p>
            <span>
              Last week you did <b>{formatTime(lastWeek.time)}</b> on this
              project.{' '}
            </span>
            <span>And this week you did even more! </span>
            <span>
              Exactly,
              <b>{formatTime(Math.abs(diff))}</b> more.
            </span>
          </p>
        );
      } else {
        thisWeekString = (
          <p>
            <span>
              Last week you did <b>{formatTime(lastWeek.time)}</b> on this
              project.{' '}
            </span>
            <span>Focus and do no less this week! </span>
            <span>
              <b>{formatTime(diff)}</b> left to do.
            </span>
          </p>
        );
      }
    }

    if (thisWeek === undefined && lastWeek !== undefined) {
      const diff = lastWeek.time - props.seconds;
      const newData =
        diff > 0 ? (
          <span>
            <b>{formatTime(Math.abs(diff))}</b> left to do.
          </span>
        ) : (
          <span>
            <b> And you did {formatTime(Math.abs(diff))}</b> more than last
            week!
          </span>
        );
      thisWeekString = (
        <p>
          <span>
            Last week you did <b>{formatTime(lastWeek.time)}</b> on this
            project.{' '}
          </span>
          <span>Focus and do no less this week! </span>
          {newData}
        </p>
      );
    }
    if (thisWeek !== undefined && lastWeek === undefined) {
      const diff = thisWeek.time + props.seconds;
      thisWeekString = (
        <p>
          <span>
            This week you worked <b>{formatTime(Math.abs(diff))}</b> on this
            project. Keep on!
          </span>
        </p>
      );
    }
    if (thisWeek === undefined && lastWeek === undefined) {
      const newData =
        props.seconds !== 0 ? (
          <span>
            Here is new data: <b>{formatTime(props.seconds)}</b> this week on
            this project!
          </span>
        ) : (
          ''
        );
      thisWeekString = (
        <p>
          <span>
            Seems you haven`t worken on this project for a while. Care to start
            now?{' '}
          </span>
          {newData}
        </p>
      );
    }
  }
  return thisWeekString;
};

MotivationBlock.defaultProps = {
  projectId: '',
  dashboardData: {},
  seconds: 0,
};

MotivationBlock.propTypes = {
  projectId: PropTypes.string,
  dashboardData: PropTypes.object,
  seconds: PropTypes.number,
};

export default MotivationBlock;
