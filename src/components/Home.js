import React, { Component } from 'react'
import firebase from './../firebase.js';
import Projects from './Projects';
import ProjectPane from './project-pane/ProjectPane';
import Textarea from 'react-textarea-autosize';

export default class Home extends Component {

    constructor(){
        super();

        this.state = {
            currentProject : {}
        }
    }

    logout = () => {
        firebase.auth().signOut();
        this.props.handleLogOut();    
    }

    async handleSetCurrentProject(projectId) {

        let {userProjects} = this.props;

        let filteredProject = await userProjects.filter(function (project, index, arr) {
            return (project.id === projectId)
        });

        this.setState({ 
            currentProject : filteredProject[0]  
        });
        



    }

    



    render() {

        let project = this.state.currentProject;

        return (
        <div className="grid-container">
            <div className="left-bar">
                <div className="currentUser">
                    <span className="name">{this.props.user.email}</span>
                    <button type="button" className="logout-btn" onClick={this.logout}>Log out</button>            
                </div>
                <Projects 
                    user  = {this.props.user}
                    userProjects = {this.props.userProjects}
                    handleSetCurrentProject = {this.handleSetCurrentProject.bind(this)}
                />
            </div>
            
            <div className="main-page">
                <ProjectPane 
                    currentProject = {this.state.currentProject}
                >

                    <h2 className="project-title">{project.title}</h2>
                    <p>{project.summary}</p>
                    <Textarea />
                </ProjectPane>
            </div>
        </div>
        )
    }
}
