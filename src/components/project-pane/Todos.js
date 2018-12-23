import React, { Component } from 'react';
import TaskForm from './../project-pane/TaskForm';
import uiud from 'uuidv4';
import TaskIcon from './../../img/task-icon.svg';

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
                <div key={task.id} className="todo-block">
                    <span className="todo-title">
                        {task.title}    
                    </span>
                </div>
            )
        })

        return (
        <div className="project-todos">
            <div className="title-block">
                <img src={TaskIcon} alt="" className="title-icon" />            
                <h3 className="title-copy">
                    Tasks 
                </h3>
            </div>
            {/* <button type="button" onClick={this.addTaskForm}>Add a task</button> */}
            {
                showTaskForm && 
                <TaskForm 
                    handleAddNewTask = {this.handleAddNewTask.bind(this)}
                />
            }
            <div className="todo-container">
                {DisplayProjectTasks}
            </div>
        </div>
        )
    }
}
