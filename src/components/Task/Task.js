import './task.css';

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const getPadTime = (time) => {
  return time.toString().padStart(2, '0');
};

function Task({ task, onToggleProperty, onDelete, onSwitchMode, children }) {
  const {
    id,
    completed,
    isEditing,
    description,
    time,
    timer: { minutes, seconds },
  } = task;

  const [timeLeft, setTimeLeft] = React.useState(Number(minutes) * 60 + Number(seconds));
  const [isCounting, setCounting] = React.useState(false);

  const min = getPadTime(Math.floor(timeLeft / 60));
  const sec = getPadTime(timeLeft - min * 60);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isCounting) setTimeLeft((timer) => (timer >= 1 ? timer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCounting]);

  const startTimer = () => setCounting(true);

  const pauseTimer = () => setCounting(false);

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
            pauseTimer();
          }}
        />
        <label onClickCapture={(e) => e.preventDefault()}>
          <span
            className="title"
            onClickCapture={() => {
              onToggleProperty(id, 'completed');
              pauseTimer();
            }}
          >
            {description}
          </span>
          <span className="description">
            <button type="button" className="icon icon-play" onClick={startTimer} disabled={completed} />
            <button type="button" className="icon icon-pause" onClick={pauseTimer} disabled={completed} />
            {`${min}:${sec}`}
          </span>
          <span className="description">created {formatDistanceToNow(time, { includeSeconds: true })} ago</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={() => onSwitchMode(id)} />
        <button type="button" className="icon icon-destroy" onClick={() => onDelete(id)} />
      </div>
      {task.isEditing && children}
    </li>
  );
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

export default Task;
