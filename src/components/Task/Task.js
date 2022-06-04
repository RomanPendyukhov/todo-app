import './task.css';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

function Task({ task, onDelete, onSwitchMode, children, onToggleProperty }) {
  const { id, completed, isEditing, description, time } = task;

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
          onChange={() => onToggleProperty(id, 'completed')}
        />
        <label>
          <span className="description" onClickCapture={() => onToggleProperty(id, 'completed')}>
            {description}
          </span>
          <span className="created">
            created
            {` ${formatDistanceToNow(time, { includeSeconds: true })} `}
            ago
          </span>
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
  }).isRequired,
  onSwitchMode: PropTypes.func.isRequired,
  onToggleProperty: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Task;
