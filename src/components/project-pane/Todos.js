import React, { Component } from 'react';
import TaskForm from './../project-pane/TaskForm';
import uiud from 'uuidv4';

export default class Todos extends Component {

    constructor() {
        super();
        
        this.state = {
            showTaskForm : false,
        }
    }


    addTaskForm = () => {
        this.setState({ showTaskForm : true });
    }

    handleAddNewTask(taskInput) {
        console.log(taskInput);

        let task = { 
            id : uiud(),
            title : taskInput,
            status : "to-do",
            date: Date.now()
        }

        this.props.handleAddTaskToProject(task);
        this.setState({ showTaskForm : false  });
    }

    
    render() {

        let { showTaskForm } = this.state;
        let { thisProjectTasks } = this.props;

        let DisplayProjectTasks = thisProjectTasks.map((task) => {
            return (
                <div key={task.id}>{task.title}</div>
            )
        })

        return (
        <div className="project-todos">
            <h3 className="title">Current tasks in progress</h3>
            <button type="button" onClick={this.addTaskForm}>Add a task</button>
            {
                showTaskForm && 
                <TaskForm 
                    handleAddNewTask = {this.handleAddNewTask.bind(this)}
                />
            }
            <div>
                {DisplayProjectTasks}
            </div>
        </div>
        )
    }
}
