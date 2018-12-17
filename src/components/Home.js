import React, { Component } from 'react'
import firebase from './../firebase.js';
import Projects from './Projects';
import ProjectPane from './project-pane/ProjectPane';
import Textarea from 'react-textarea-autosize';
import { debounce } from 'lodash';

export default class Home extends Component {

    constructor(){
        super();

        this.state = {
            currentProject : null,
            projectSummary: ''
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
            currentProject : filteredProject[0],
            projectSummary : filteredProject[0].summary
        });


    }



    handleSummaryChange = (value) => { 
        this.setState({ projectSummary : value  });        
        this.updateProjectSummary();
    }

    updateProjectSummary = debounce(() => {  
        let projectId = this.state.currentProject.id;
        let ref = firebase.database().ref("projects").orderByChild("id").equalTo(projectId);
        let {projectSummary} = this.state;
        
        ref.on('child_added', snapshot => {
            snapshot.ref.update({ summary : this.state.projectSummary })    
            this.setState({ projectSummary });
        });
        
        console.log(this.state.projectSummary);

    }, 1000);



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
                { project && 
                    <ProjectPane 
                        currentProject = {this.state.currentProject}
                    >
    
                        <h2 className="project-title">{project.title}</h2>
                        {/* <p>{project.summary}</p> */}
                        <Textarea 
                            inputRef={ref => (this.detailsRef = ref)} 
                            minRows={3} 
                            className="project-summary"
                            value={this.state.projectSummary}
                            placeholder="Write details of your project here"
                            onChange = {(e) => this.handleSummaryChange(e.target.value)}
                        />
                    </ProjectPane>
                }
            </div>
        </div>
        )
    }
}
