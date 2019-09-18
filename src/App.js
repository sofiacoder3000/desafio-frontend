import React, { Component } from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import "./App.scss";
import tasks from "./sample/tasks.json";
// Components
import Tasks from "./components/Tasks";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";

const SortableItem = sortableElement(props => (
  <Task
    task={props.task}
    key={props.task.id}
    deleteTask={props.deleteTask}
    checkTask={props.checkTask}
    onSortEnd={props.onSortEnd}
  />
));

const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});
export default class App extends Component {
  state = {
    input: "",
    tasks: tasks,
    tasksOff: []
  };
  componentDidMount() {
    this.setState({
      tasksOff: this.state.tasks.filter(task => task.done !== true)
    });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ tasksOff }) => ({
      tasksOff: arrayMove(tasksOff, oldIndex, newIndex)
    }));
  };

  addTask = description => {
    console.log(description, this.state.tasks.length);
    const newTask = {
      description: description,
      id: this.state.tasks.length
    };
    this.setState({
      tasks: [...this.state.tasks, newTask],
      tasksOff: [...this.state.tasksOff, newTask]
    });
  };

  deleteTask = id => {
    const newTasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({
      tasks: newTasks,
      tasksOff: newTasks.filter(task => task.done !== true)
    });
  };

  checkTask = id => {
    console.log("checkTask");
    const ediTasks = this.state.tasks.map(task => {
      if (task.id === id) task.done = !task.done;
      return task;
    });
    this.setState({
      tasks: ediTasks,
      tasksOff: ediTasks.filter(task => task.done !== true)
    });
  };

  render() {
    const tasksOn = this.state.tasks.filter(task => task.done === true);
    return (
      <div className="App">
        <h1>Desafío Front-end (Solved*)</h1>
        <main>
          <div className="PorHacer">
            <div className="TasksTitle">
              <h2>Por hacer:</h2>
            </div>
            <div className="Tasks">
              <TaskForm addTask={this.addTask} />
              <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {this.state.tasksOff.map((task, index) => (
                  <SortableItem
                    index={index}
                    key={task.id}
                    task={task}
                    deleteTask={this.deleteTask}
                    checkTask={this.checkTask}
                    // onSortEnd={this.onSortEnd}
                  />
                ))}
              </SortableContainer>
            </div>
          </div>
          <div className="Hecho">
            <div className="TasksTitle">
              <h2>Hecho:</h2>
            </div>
            <div className="Tasks">
              <Tasks
                tasks={tasksOn}
                deleteTask={this.deleteTask}
                checkTask={this.checkTask}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}
