import './taskList.css';

import PropTypes from 'prop-types';

import Task from '../Task';
import EditTask from '../EditTask';

function TaskList({ tasks, onDelete, onSwitchMode, onEdit, onToggleProperty }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          onToggleProperty={onToggleProperty}
          onDelete={onDelete}
          onSwitchMode={onSwitchMode}
          task={task}
        >
          <EditTask editingText={task.description} onEdit={onEdit} />
        </Task>
      ))}
    </ul>
  );
}

TaskList.propType = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      isEditing: PropTypes.bool.isRequired,
      time: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  onSwitchMode: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleProperty: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskList;
