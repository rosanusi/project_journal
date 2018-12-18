import React, { Component } from 'react';
import TaskForm from './../project-pane/TaskForm';
import firebase from './../../firebase.js';
import uiud from 'uuidv4';

export default class Todos extends Component {

    constructor() {
        super();
        
        this.state = {
            showTaskForm : false,
            // thisProjectTasks : []
        }
    }

    async componentDidMount() {

        // // let { projectTasks } = this.state;
        // let projectId = this.props.thisProject.id;
        // let { thisProjectTasks } =  this.state;
        
        // let ref = await firebase.database().ref("projects").orderByChild("id").equalTo(projectId);
        
        // ref.on('child_added', snapshot => {

        //     let project = snapshot.val();
        //     let tasks = project.tasks;
          
        //     for (let task in tasks) {
        //         console.log( tasks[task] )
        //         thisProjectTasks.push(tasks[task]);
        //     }
            
        //     this.setState({ thisProjectTasks });
        //     console.log(thisProjectTasks);    
        // });

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

        // this.addTaskToProject(task);
        this.props.handleAddTaskToProject(task);

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
        let { thisProjectTasks } = this.props;
        console.log(thisProjectTasks);

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
