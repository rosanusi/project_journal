import React, { Component } from 'react';
import NewProjectForm from './NewProjectForm';
import AddIcon from './../img/add-icon.svg';

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

    setCurrentProject = (projectId) => {
        this.props.handleSetCurrentProject(projectId);
        this.setState({ showActiveClass : true  });
    }
    
    render() {

        let {formClicked} = this.state;
        let {userProjects} = this.props;    


        let DisplayProjects = userProjects.map((project) => { 
            return (
                <div key={project.id} className="project-link">
                    <div className="project-link-brief">
                        <button 
                            type="button" 
                            className="link-btn project-link-btn"
                            onClick={() => this.setCurrentProject(project.id)}
                        >
                            <span className="project-hash">#</span>{project.title}
                        </button>
                    </div>
                </div>
            )
        });


        return (
            <div className="projects-menu">
                <div className="projects-title-block">
                    <h3 className="title-copy">
                        Projects 
                    </h3>
                </div>

                <div className="projects-list">
                    {DisplayProjects}
                </div>

                { formClicked && 
                    <NewProjectForm 
                        user = {this.props.user} 
                        formClicked = {this.formClicked}
                    />
                }

                <div className="addNewProject">
                    <button 
                        className="icon-btn addProject-btn"
                        type="button" 
                        onClick={this.formClicked}>
                            <img className="icon" src={AddIcon} alt="" />
                            New Project
                    </button>
                </div>

            </div>
        )
    }
}
