import React, { Component } from 'react'
import firebase from './../firebase.js';
import Projects from './Projects';
import ProjectPane from './project-pane/ProjectPane';
import Todos from './project-pane/Todos';
import Textarea from 'react-textarea-autosize';
import { debounce } from 'lodash';

export default class Home extends Component {

    constructor(){
        super();

        this.state = {
            thisProject : null,
            projectSummary: '',
            thisProjectTasks : [] 
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
        //   userProjects.unshift(project)
          this.setState({
              thisProject : project,
              projectSummary : project.summary,
              thisProjectTasks : this.setProjectTasks(project)
          });
    
          console.log(this.state.thisProject);
    
        });

    }

    setProjectTasks(project) {

        let { thisProjectTasks } = this.state;
        let tasks = project.tasks;
        let taskList = [];
        for (let task in tasks) {
            console.log( tasks[task] )
            taskList.push(tasks[task]);
        }
        this.setState({ thisProjectTasks });
        return taskList;
    }

    handleAddTaskToProject(tasks) {
        let projectId = this.state.thisProject.id;

        let { thisProjectTasks } = this.state;

        let ref = firebase.database().ref("projects").orderByChild("id").equalTo(projectId);
      
        ref.on('child_added', snapshot => {
            let project = snapshot.val();
            let tasks = project.tasks;

            for (let task in tasks) {
                console.log( tasks[task] )
                thisProjectTasks.push(tasks[task]);
            }
 
        //   userProjects.unshift(project)
          this.setState({
            //   thisProject : project,
              thisProjectTasks 
          });
    
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
        
        console.log(this.state.projectSummary);

    }, 1000);



    render() {
        
        let project = this.state.thisProject;

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
                        // currentProject = {this.state.currentProject}
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

                        <Todos 
                            // thisProject = {this.state.thisProject}
                            thisProjectTasks = {this.state.thisProjectTasks}
                            handleAddTaskToProject = {this.handleAddTaskToProject.bind(this)}
                        />

                    </ProjectPane>
                }
            </div>
        </div>
        )
    }
}
