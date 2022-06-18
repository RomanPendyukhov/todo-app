import './EditTask.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskEditor extends Component {
  constructor(props) {
    super(props);
    const { editingText } = this.props;
    this.state = {
      value: editingText,
    };
  }

  onSubmit = (e) => {
    const { onEdit } = this.props;
    const { value } = this.state;

    if (e.code === 'Enter') {
      onEdit(value);
    }
  };

  onInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { value } = this.state;
    return <input type="text" value={value} className="edit" onChange={this.onInput} onKeyDown={this.onSubmit} />;
  }
}

TaskEditor.propTypes = {
  editingText: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};
