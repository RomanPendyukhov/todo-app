import './footer.css';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter';

function Footer({ onClearCompleted, leftTasks, filter, toggleFilter }) {
  let item = 'item';
  if (leftTasks > 1 || leftTasks === 0) {
    item = 'items';
  }
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${leftTasks} `}
        {item} left
      </span>
      <TaskFilter filter={filter} toggleFilter={toggleFilter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  onClearCompleted: PropTypes.func.isRequired,
  leftTasks: PropTypes.number.isRequired,
};

export default Footer;
