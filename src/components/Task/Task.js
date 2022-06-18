import './task.css';

import { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  constructor(props) {
    super(props);
    const { task } = this.props;
    this.state = {
      minutes: task.timer.minutes,
      seconds: task.timer.seconds,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    clearInterval(this.timer);
    const { seconds, minutes } = this.state;

    this.timer = setInterval(() => {
      if (seconds < 59) {
        const sec = this.timerStep('seconds');
        this.setState({ seconds: sec });
      } else if (minutes < 59) {
        const min = this.timerStep('minutes');
        this.setState({
          minutes: min,
          seconds: '00',
        });
      }
    }, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.timer);
  };

  timerStep(time) {
    const { [time]: t } = this.state;
    let step = +t + 1;
    step = step < 10 ? `0${step}` : step;
    return step;
  }

  render() {
    const { task, onDelete, onSwitchMode, onToggleProperty, children } = this.props;
    const { id, completed, isEditing, description, time } = task;
    const { minutes, seconds } = this.state;

    const liClassName = classNames({
      completed,
      editing: isEditing,
    });

    return (
      <li className={liClassName}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => {
              onToggleProperty(id, 'completed');
              this.onPauseTimer();
            }}
          />
          <label onClickCapture={(e) => e.preventDefault()}>
            <span
              className="title"
              onClickCapture={() => {
                onToggleProperty(id, 'completed');
                this.onPauseTimer();
              }}
            >
              {description}
            </span>
            <span className="description">
              <button type="button" className="icon icon-play" onClick={this.startTimer} disabled={completed} />
              <button type="button" className="icon icon-pause" onClick={this.pauseTimer} disabled={completed} />
              {`${minutes}:${seconds}`}
            </span>
            <span className="description">created {formatDistanceToNow(time, { includeSeconds: true })} ago</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={() => onSwitchMode(id)} />
          <button type="button" className="icon icon-destroy" onClick={() => onDelete(id)} />
        </div>
        {isEditing && children}
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    timer: PropTypes.shape({
      minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
  onToggleProperty: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSwitchMode: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
