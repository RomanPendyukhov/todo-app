import './newTaskForm.css';

import React from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ onAdd }) {
  const [description, setDescription] = React.useState('');
  const [time, setTime] = React.useState({
    minutes: '',
    seconds: '',
  });

  const changeTime = (e) => {
    const { value, name } = e.target;
    if (value.trim() && !Number.isNaN(value) && +value <= 59 && +value >= 0) {
      setTime({ ...time, [name]: value });
    }
    if (!value.trim()) setTime({ ...time, [name]: '' });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (description.trim()) {
      const { minutes, seconds } = time;
      onAdd({ description, minutes, seconds });
      setDescription('');
      setTime({ minutes: '', seconds: '' });
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        value={description}
        placeholder="What needs to be done?"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        name="minutes"
        value={time.minutes}
        onChange={changeTime}
        placeholder="Min"
      />
      <input
        className="new-todo-form__timer"
        name="seconds"
        value={time.seconds}
        placeholder="Sec"
        onChange={changeTime}
      />
      <button type="submit" hidden />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;
