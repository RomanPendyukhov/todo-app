import './newTaskForm.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      minutes: '',
      seconds: '',
    };
  }

  changeTime = (e) => {
    const { value, name } = e.target;
    if (value.trim() && !Number.isNaN(value) && +value <= 59 && +value >= 0) {
      this.setState({
        [name]: value,
      });
    }
    if (!value.trim()) this.setState({ [name]: '' });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onAdd } = this.props;
    const { description } = this.state;

    if (description.trim()) {
      onAdd(this.state);
      this.setState({ description: '', minutes: '', seconds: '' });
    }
  };

  render() {
    const { description, minutes, seconds } = this.state;

    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          value={description}
          placeholder="What needs to be done?"
          onChange={(e) => this.setState({ description: e.target.value })}
        />
        <input
          className="new-todo-form__timer"
          name="minutes"
          value={minutes}
          onChange={this.changeTime}
          placeholder="Min"
        />
        <input
          className="new-todo-form__timer"
          name="seconds"
          value={seconds}
          placeholder="Sec"
          onChange={this.changeTime}
        />
        <button type="submit" hidden />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
