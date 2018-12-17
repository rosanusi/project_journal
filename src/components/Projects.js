import React, { Component } from 'react';
import NewProjectForm from './NewProjectForm';
import AddIcon from './../img/add-icon.svg';
import ProjectIcon from './../img/project-icon.svg';

export default class Projects extends Component {

    constructor(){
        super();

        this.state = {
            formClicked : false,
            userProjects : []
        }
        
    }

    formClicked = () => {
        if(this.state.formClicked){
            this.setState({ formClicked : false  });
        } else {
            this.setState({ formClicked : true  });
        }
    }

    setCurrentProject = (e, projectId) => {
        this.props.handleSetCurrentProject(projectId);
    }
    
    render() {

        let {formClicked} = this.state;
        let {userProjects} = this.props;


        let DisplayProjects = userProjects.map((project) => { 
            return (
                <div key={project.id} className="project-link">
                    <img src={ProjectIcon} alt="" className="project-icon" />
                    <div className="project-link-brief">
                        <button type="button" className="project-title" onClick={(e) => this.setCurrentProject(e, project.id)}>{project.title}</button>
                    </div>
                </div>
            )
        })

        // console.log(userProjects);

        return (
            <div className="projects-menu">
                <h3 className="title">Projects 
                    <button 
                        className="icon-btn addProject-btn"
                        type="button" 
                        onClick={this.formClicked}>
                            <img src={AddIcon} alt="" />
                    </button>
                </h3>

                { formClicked && 
                    <NewProjectForm 
                        user = {this.props.user} 
                        formClicked = {this.formClicked}
                    />
                }

                <div className="projects-list">
                    {DisplayProjects}
                </div>
            </div>
        )
    }
}
