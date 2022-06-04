import './app.css';

import { Component } from 'react';
import { v1 as uuid } from 'uuid';

import TaskList from '../TaskList';
import TaskFilter from '../TaskFilter';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

export default class App extends Component {
  state = {
    taskData: [
      {
        id: '1',
        description: 'Task 1',
        completed: false,
        isEditing: false,
        time: new Date(2022, 5, 15, 13, 22),
      },
      {
        id: '2',
        description: 'Task 2',
        completed: false,
        isEditing: false,
        time: new Date(2022, 5, 10, 10, 22),
      },
      {
        id: '3',
        description: 'Task 3',
        completed: false,
        isEditing: false,
        time: new Date(2022, 5, 2, 22, 22),
      },
    ],
    filter: 'All',
  };

  onDelete = (id) => {
    const { taskData } = this.state;
    this.setState({
      taskData: taskData.filter((task) => task.id !== id),
    });
  };

  onAdd = (description) => {
    const { taskData } = this.state;
    const newTask = {
      id: uuid(),
      description,
      completed: false,
      isEditing: false,
      time: new Date(),
    };

    this.setState({
      taskData: [...taskData, newTask],
    });
  };

  onToggleProperty = (id, property) => {
    const { taskData } = this.state;
    const newArray = taskData.map((task) => {
      if (task.id === id) return { ...task, [property]: !task[property] };
      return task;
    });

    this.setState({
      taskData: newArray,
    });
  };

  onSwitchMode = (id) => {
    const { taskData } = this.state;
    const newArray = taskData.map((task) => {
      if (task.completed) return task;
      if (task.id === id) return { ...task, isEditing: true };
      if (task.isEditing) return { ...task, isEditing: false };
      return task;
    });

    this.setState({
      taskData: newArray,
    });
  };

  onEdit = (text) => {
    const { taskData } = this.state;
    const newArray = taskData.map((task) => {
      if (task.isEditing) return { ...task, isEditing: false, description: text };
      return task;
    });

    this.setState({
      taskData: newArray,
    });
  };

  toggleFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  onClearCompleted = () => {
    const { taskData } = this.state;
    this.setState({
      taskData: taskData.filter((task) => !task.completed),
    });
  };

  filterTasks() {
    const { taskData: tasks } = this.state;
    const { filter } = this.state;

    switch (filter) {
      case 'Active':
        return tasks.filter((task) => !task.completed);
      case 'Completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }

  render() {
    const { taskData, filter } = this.state;
    const leftTasks = taskData.filter((task) => !task.completed).length;
    const tasks = this.filterTasks();

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onAdd={this.onAdd} />
        </header>
        <section className="main">
          <TaskList
            onDelete={this.onDelete}
            onToggleProperty={this.onToggleProperty}
            onSwitchMode={this.onSwitchMode}
            onEdit={this.onEdit}
            tasks={tasks}
          />
          <Footer filter={filter} leftTasks={leftTasks} onClearCompleted={this.onClearCompleted}>
            <TaskFilter filter={filter} toggleFilter={this.toggleFilter} />
          </Footer>
        </section>
      </section>
    );
  }
}
