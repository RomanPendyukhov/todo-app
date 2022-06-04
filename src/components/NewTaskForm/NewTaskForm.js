import './newTaskForm.css';

import { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    const { fieldIsEditing, editingText } = this.props;
    this.state = {
      value: fieldIsEditing ? editingText : '',
    };
  }

  onInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onAdd, fieldIsEditing, onEdit } = this.props;
    const { value } = this.state;

    if (e.code === 'Enter' && value.trim()) {
      if (!fieldIsEditing) {
        onAdd(value);
      } else {
        onEdit(value);
      }

      this.setState({
        value: '',
      });
    }
  };

  render() {
    const { fieldIsEditing } = this.props;
    const { value } = this.state;

    const inputClass = classNames({
      'new-todo': !fieldIsEditing,
      edit: fieldIsEditing,
    });

    return (
      <input
        className={inputClass}
        placeholder={fieldIsEditing ? '' : 'What needs to be done?'}
        value={value}
        onChange={this.onInput}
        onKeyDown={this.onSubmit}
      />
    );
  }
}

NewTaskForm.defaultProps = {
  fieldIsEditing: false,
  editingText: '',
  onAdd: () => {},
  onEdit: () => {},
};

NewTaskForm.propTypes = {
  fieldIsEditing: PropTypes.bool,
  editingText: PropTypes.string,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
};
