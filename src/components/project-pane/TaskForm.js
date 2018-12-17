import React, { Component } from 'react';

class TaskForm extends Component {

    addNewTask = (e) => {
        e.preventDefault();

        let taskInput = this.refs.taskInput.value;
        this.props.handleAddNewTask(taskInput);

    }

    render() {
        return (
            <form onSubmit={(e) => this.addNewTask(e)}>
                <input type="text" ref="taskInput" placeholder="Add new task here" />
            </form>
        );
    }
}

export default TaskForm;