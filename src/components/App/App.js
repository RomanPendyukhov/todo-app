import './app.css';

import React from 'react';
import { v1 as uuid } from 'uuid';

import TaskList from '../TaskList';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

const taskData = [
  {
    id: '1',
    description: 'Task 1',
    completed: false,
    isEditing: false,
    time: new Date(2022, 5, 2, 22, 22),
    timer: { minutes: '00', seconds: '00' },
  },
  {
    id: '2',
    description: 'Task 2',
    completed: false,
    isEditing: false,
    time: new Date(2022, 5, 10, 10, 22),
    timer: { minutes: '00', seconds: '00' },
  },
  {
    id: '3',
    description: 'Task 3',
    completed: false,
    isEditing: false,
    time: new Date(2022, 5, 15, 13, 22),
    timer: { minutes: '00', seconds: '00' },
  },
];

function App() {
  const [tasks, setTasks] = React.useState(taskData);
  const [filter, setFilter] = React.useState('All');

  const onDelete = (id) => {
    const newArray = tasks.filter((task) => task.id !== id);
    setTasks(newArray);
  };

  const onAdd = (obj) => {
    const { description } = obj;
    let { minutes, seconds } = obj;
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    seconds = seconds.length === 1 ? `0${seconds}` : seconds;
    const newTask = {
      id: uuid(),
      description,
      completed: false,
      isEditing: false,
      time: new Date(),
      timer: { minutes: minutes || '00', seconds: seconds || '00' },
    };

    setTasks(tasks.concat(newTask));
  };

  const onToggleProperty = (id, property) => {
    const newArray = tasks.map((task) => {
      if (task.id === id) return { ...task, [property]: !task[property] };
      return task;
    });

    setTasks(newArray);
  };

  const onSwitchMode = (id) => {
    const newArray = tasks.map((task) => {
      if (task.completed) return task;
      if (task.id === id) return { ...task, isEditing: true };
      if (task.isEditing) return { ...task, isEditing: false };
      return task;
    });

    setTasks(newArray);
  };

  const onEdit = (text) => {
    const newArray = tasks.map((task) => {
      if (task.isEditing)
        return { ...task, isEditing: false, description: text, timer: { minutes: '00', seconds: '00' } };
      return task;
    });

    setTasks(newArray);
  };

  const toggleFilter = (settedFilter) => setFilter(settedFilter);
  const onClearCompleted = () => {
    const newArray = tasks.filter((task) => !task.completed);
    setTasks(newArray);
  };

  const filterTasks = () => {
    switch (filter) {
      case 'Active':
        return tasks.filter((task) => !task.completed);
      case 'Completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = filterTasks();
  const leftTasks = tasks.filter((task) => !task.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onAdd={onAdd} />
      </header>
      <section className="main">
        <TaskList
          onDelete={onDelete}
          onToggleProperty={onToggleProperty}
          onSwitchMode={onSwitchMode}
          onEdit={onEdit}
          tasks={filteredTasks}
        />
        <Footer filter={filter} leftTasks={leftTasks} toggleFilter={toggleFilter} onClearCompleted={onClearCompleted} />
      </section>
    </section>
  );
}

export default App;
