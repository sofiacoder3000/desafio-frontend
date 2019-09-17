import React, { Component } from "react";
import PropTypes from "prop-types";
import Task from "./Task.js";

class Tasks extends Component {
  render() {
    return this.props.tasks.map((task, index) => (
      <Task
        task={task}
        key={task.id}
        deleteTask={this.props.deleteTask}
        checkTask={this.props.checkTask}
        onSortEnd={this.props.onSortEnd}
      />
    ));
  }
}

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  deleteTask: PropTypes.func.isRequired,
  checkTask: PropTypes.func.isRequired
};

export default Tasks;
