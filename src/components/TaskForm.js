import React, { Component } from "react";
import PropTypes from "prop-types";
//images
import agregar from "../assets/agregar.svg";

const propTypes = {
  addTask: PropTypes.func.isRequired
};

class TaskForm extends Component {
  state = {
    title: "Crear nueva tarea."
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.addTask(this.state.title);
    this.setState({
      title: "Crear nueva tarea."
    });
  };

  onChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="taskForm">
        <div className="task">
          <div
            className="taskIcon"
            style={{ backgroundImage: `url(${agregar})` }}
            onClick={this.onSubmit}
          ></div>
          <div className="taskDescription">
            <input
              type="text"
              name="title"
              id=""
              placeholder="Crear nueva tarea."
              onChange={this.onChange}
              value={this.state.title}
              required
            />
          </div>
        </div>
      </div>
    );
  }
}

TaskForm.propTypes = propTypes;

export default TaskForm;
