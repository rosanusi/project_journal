import React, { Component } from 'react';
import TaskForm from './../project-pane/TaskForm';
import uiud from 'uuidv4';
import AddIcon from './../../img/add-icon.svg';
import TaskIcon from './../../img/task-icon.svg';
import RemoveIcon from './../../img/remove-icon.svg';

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

    removeTask = (taskId) => {
        this.props.handleRemoveTask(taskId);
    }   
    
    
    render() {

        let { showTaskForm } = this.state;
        let { thisProjectTasks } = this.props;

        let DisplayProjectTasks = thisProjectTasks.map((task) => {
            return (
                <div key={task.id} className="todo-block">
                    <input type="checkbox" id={task.id} className="todo-checkbox" />
                    <label htmlFor={task.id} className="todo-title">
                        {task.title}
                    </label>
                    <button 
                        type="button" 
                        className="icon-btn remove-btn" 
                        onClick={() => this.removeTask(task.id)}
                    >
                        <img className="remove-icon" src={RemoveIcon} alt="" />
                    </button>
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

            <div className="todo-container">
                
                {
                    showTaskForm && 
                    <TaskForm 
                        handleAddNewTask = {this.handleAddNewTask.bind(this)}
                    />
                }

                {DisplayProjectTasks}

                <button className="icon-btn" type="button" onClick={this.addTaskForm}>
                    <img className="icon" src={AddIcon} alt="" />
                    New Task
                </button>

            </div>

        </div>
        )
    }
}
