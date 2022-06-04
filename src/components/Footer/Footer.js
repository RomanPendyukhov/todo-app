import './footer.css';
import PropTypes from 'prop-types';

function Footer({ onClearCompleted, leftTasks, children }) {
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
      {children}
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  onClearCompleted: PropTypes.func.isRequired,
  leftTasks: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

export default Footer;
