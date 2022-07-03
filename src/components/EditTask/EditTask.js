import './EditTask.css';

import React from 'react';
import PropTypes from 'prop-types';

function EditTask({ editingText, onEdit }) {
  const [text, setText] = React.useState(editingText);

  const onSubmit = (e) => {
    if (e.code === 'Enter') {
      onEdit(text);
    }
  };

  const onInput = (e) => setText(e.target.value);

  return <input type="text" value={text} className="edit" onChange={onInput} onKeyDown={onSubmit} />;
}

EditTask.propTypes = {
  editingText: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditTask;
