import React, { Component } from 'react';
import firebase from './../firebase.js';
import Header from './Header';
import Projects from './Projects';
import ProjectPane from './project-pane/ProjectPane';
import Todos from './project-pane/Todos';
import Notes from './project-pane/Notes';
import Textarea from 'react-textarea-autosize';
import { debounce } from 'lodash';

export default class Home extends Component {

    constructor(){
        super();

        this.state = {
            thisProject : null,
            projectSummary: '',
            thisProjectTasks : [],
            thisProjectNotes : []
        }

    }

    logout = () => {
        firebase.auth().signOut();
        this.props.handleLogOut();    
    }

    async handleSetCurrentProject(projectId) {

        let ref = firebase.database().ref("projects").orderByChild("id").equalTo(projectId);
      
        ref.on('child_added', snapshot => {
            let project = snapshot.val();

            this.setState({
              thisProject : project,
              projectSummary : project.summary,
              thisProjectTasks : this.setProjectTasks(project),
              thisProjectNotes : this.setProjectNotes(project)
            });
    
        });

        console.log(this.state.thisProject);

    }

    getThisProjectKey() {

        let projectId = this.state.thisProject.id;

        let ref = firebase.database().ref("projects").orderByChild("id").equalTo(projectId);
        let projectKey;
        ref.once('child_added', function(snapshot) {
            projectKey = snapshot.key;
        });

        return projectKey;
    }

    setProjectTasks(project) {

        let { thisProjectTasks } = this.state;

        let tasks = project.tasks;
        let taskList = [];
        for (let task in tasks) {
            taskList.unshift(tasks[task]);
        }
        this.setState({ thisProjectTasks });
        return taskList;
    }


    setProjectNotes(project) {

        let { thisProjectNotes } = this.state;

        let notes = project.notes;
        let notesList = [];
        for (let note in notes) {
            notesList.unshift(notes[note]);
        }
        this.setState({ thisProjectNotes });        
        return notesList;
    }



    handleAddTaskToProject(task) {
        
        let projectId = this.state.thisProject.id;
        let ref = firebase.database().ref("projects").orderByChild("id").equalTo(projectId);

        ref.once("child_added", function(snapshot) {
            snapshot.ref.child('tasks').push(task);
        });

        this.handleSetCurrentProject(projectId);

    }

    handleAddNoteToProject(newNote) {
        let projectId = this.state.thisProject.id;

        let ref = firebase.database().ref("projects").orderByChild("id").equalTo(projectId);

        ref.once("child_added", function(snapshot) {
            snapshot.ref.child('notes').push(newNote);
        });

        this.handleSetCurrentProject(projectId);

        // console.log(this.state.thisProject);

    }

    async handleRemoveTask(taskId){

        let projectId = this.state.thisProject.id;
        let key = await this.getThisProjectKey();
        let that = this;
        await console.log(key);

        let tasksRef = firebase.database().ref("projects/" + key + "/tasks").orderByChild("id").equalTo(taskId);

        await tasksRef.once('child_added').then(function(snapshot) {
            console.log(snapshot.val());
            snapshot.ref.remove();
            that.handleSetCurrentProject(projectId);

        }, function(error) {
            // The Promise was rejected.
            console.log(error);
        });        
    }


    async handleRemoveNote(noteId){

        let projectId = this.state.thisProject.id;
        let key = await this.getThisProjectKey();
        let that = this;
        await console.log(key);

        let notesRef = firebase.database().ref("projects/" + key + "/notes").orderByChild("id").equalTo(noteId);

        await notesRef.once('child_added').then(function(snapshot) {
            console.log(snapshot.val());
            snapshot.ref.remove();
            that.handleSetCurrentProject(projectId);

        }, function(error) {
            // The Promise was rejected.
            console.log(error);
        });        
    }
    


    handleSummaryChange = (value) => { 
        this.setState({ projectSummary : value  });        
        this.updateProjectSummary();
    }

    updateProjectSummary = debounce(() => {  
        let projectId = this.state.thisProject.id;
        let ref = firebase.database().ref("projects").orderByChild("id").equalTo(projectId);
        let {projectSummary} = this.state;
        
        ref.on('child_added', snapshot => {
            snapshot.ref.update({ summary : this.state.projectSummary })    
            this.setState({ projectSummary });
        });
        

    }, 1000);

    async deleteProject() {

        let projectId = this.state.thisProject.id;
        let projectRef =  await firebase.database().ref("projects").orderByChild("id").equalTo(projectId);
        // let key = await this.getThisProjectKey();
        // let that = this;
        // await console.log(key);

        await projectRef.once('child_added').then(function(snapshot) {
            console.log(snapshot.val());
            snapshot.ref.remove();
        }, function(error) {
            // The Promise was rejected.
            console.log(error);
        });    

        let nextProjectId = await this.getNextProjectId();

        console.log(nextProjectId);
        if(nextProjectId === null){
            this.props.loadUserProjects(this.props.user.id);
        } else {
            this.handleSetCurrentProject(nextProjectId);
            this.props.loadUserProjects(this.props.user.id);
            console.log('remove this project permanently');    
        }

    }

    async getNextProjectId() {
        let projectId = this.state.thisProject.id;
        let projectsRef = await firebase.database().ref("projects");

        let projectsList;
        let result;

        await projectsRef.once('value').then(function(snapshot) {
            result = snapshot.val();
        }, function(error) {
            console.log(error);
        });   

        if(result === null){
            projectsList = null;
        }else {
            projectsList = Object.values(result);
        }

    
        let nextProjectId;
         
        if(projectsList === null ){
            nextProjectId = null;
        } else {
            let index = projectsList.findIndex(project => project.id === projectId);
            let nextIndex = index + 1;
            nextProjectId = projectsList[nextIndex].id;
        }

        return nextProjectId;


    }





    render() {
        
        let project = this.state.thisProject;
        

        return (
        <div>
            {/* <Header 
                user  = {this.props.user}
            /> */}
            <div className="grid-container">
                <div className="left-bar">
                    <Projects 
                        user  = {this.props.user}
                        userProjects = {this.props.userProjects}
                        handleSetCurrentProject = {this.handleSetCurrentProject.bind(this)}
                    />
                </div>
                
                <div className="main-page">
                    { project && 
                        <ProjectPane 
                            // currentProject = {this.state.currentProject}
                        >
                            <h2 className="project-title">
                                {project.title} 
                                <button type="button" className="project-delete-btn" onClick={this.deleteProject.bind(this)}>Delete Project</button>
                            </h2>
                            {/* <p>{project.summary}</p> */}
                            <Textarea 
                                inputRef={ref => (this.detailsRef = ref)} 
                                minRows={2} 
                                className="project-summary"
                                value={this.state.projectSummary}
                                placeholder="Write details of your project here"
                                onChange = {(e) => this.handleSummaryChange(e.target.value)}
                            />

                            <Todos 
                                // thisProject = {this.state.thisProject}
                                thisProjectTasks = {this.state.thisProjectTasks}
                                handleAddTaskToProject = {this.handleAddTaskToProject.bind(this)}
                                handleRemoveTask = {this.handleRemoveTask.bind(this)}
                            />
                            <Notes 
                                thisProjectNotes = {this.state.thisProjectNotes}
                                handleAddNoteToProject = {this.handleAddNoteToProject.bind(this)}
                                handleRemoveNote = {this.handleRemoveNote.bind(this)}
                            />
                        </ProjectPane>
                    }
                </div>
                <div className="right-bar">

                </div>
            </div>
        </div>            
        )
    }
}
