import './taskFilter.css';
import PropTypes from 'prop-types';

function TaskFilter({ toggleFilter, filter }) {
  const filters = ['All', 'Completed', 'Active'];

  return (
    <ul className="filters">
      {filters.map((filterName) => (
        <li key={filterName}>
          <button
            type="button"
            className={filter === filterName ? 'selected' : ''}
            onClick={(e) => toggleFilter(e.target.textContent)}
          >
            {filterName}
          </button>
        </li>
      ))}
    </ul>
  );
}

TaskFilter.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TaskFilter;
