import React, { Component } from 'react';
import TaskForm from './../project-pane/TaskForm';
import firebase from './../../firebase.js';
import uiud from 'uuidv4';

export default class Todos extends Component {

    constructor() {
        super();
        
        this.state = {
            showTaskForm : false
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

        this.addTaskToProject(task);
    }

    addTaskToProject(task){

        let projectId = this.props.thisProject.id;
        let ref = firebase.database().ref("projects").orderByChild("id").equalTo(projectId);
        
        ref.once("child_added", function(snapshot) {
            snapshot.ref.child('tasks').push(task);
            console.log('success');
        });


        console.log(projectId);
        console.log(task);
    }

    
    render() {

        let { showTaskForm } = this.state;

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
            <ul>
            </ul>
        </div>
        )
    }
}
