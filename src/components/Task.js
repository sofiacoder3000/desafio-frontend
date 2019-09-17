import React from "react";
import PropTypes from "prop-types";
import { sortableHandle } from "react-sortable-hoc";
//images
import mover from "../assets/Mover.svg";
import cuadroCheckOff from "../assets/cuadro_check_off.svg";
import cuadroCheckOn from "../assets/cuadro_check_on.svg";
import borrar from "../assets/borrar.svg";

const DragHandle = sortableHandle(() => (
  <div
    className="taskIcon"
    style={{
      backgroundImage: `url(${mover})`
    }}
  ></div>
));

const Task = props => {
  const { task } = props;
  //para el icono de check on  off
  const cuadro = task.done === true ? cuadroCheckOn : cuadroCheckOff;
  //para el icono de orden (sortable)
  const dragHandle = cuadro === cuadroCheckOff ? <DragHandle /> : "";
  return (
    <div className="task">
      {dragHandle}

      <div
        className="taskIcon"
        style={{ backgroundImage: `url(${cuadro})` }}
        onClick={props.checkTask.bind(this, task.id)}
      ></div>

      <div className="taskDescription">{task.description}</div>

      <div
        className="taskIcon"
        style={{ backgroundImage: `url(${borrar})` }}
        onClick={props.deleteTask.bind(this, task.id)}
      ></div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  checkTask: PropTypes.func.isRequired
};

export default Task;
