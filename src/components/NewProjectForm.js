import React, { Component } from 'react';
import uiud from 'uuidv4';
import firebase from './../firebase.js';

export default class NewProjectForm extends Component {

    constructor(){
        super();

        this.state = ({
            project : {},

        })
    }

    handleAddNewProject = (e) => {
        e.preventDefault();
        console.log('Lets do what we can');

        let projectTitle = this.refs.projectRef.value;

        console.log(projectTitle);
        this.addProjectToState(projectTitle);

    }

    async addProjectToState(projectTitle) {

        let newProject = {
            id : uiud(),
            title : projectTitle,
            summary : 'This is where the details of your project goes. You should edit this',
            dateCreated : Date.now(),
            deadline : null,
            owner : this.props.user.email,
            ownerId : this.props.user.id
        }

        await this.setState({ 
            project : newProject 
        }, () => {
            console.log(this.state.project)
        } );

        await this.addProjectsToDB();


    }

    async addProjectsToDB() {

        let project = this.state.project;
        // let id = this.props.user.id;
        let key = await firebase.database().ref('projects').push().key;

        let ref = await firebase.database().ref('projects/'+key);
        
        ref.set(project);

        console.log('success');
        this.props.formClicked();

    }


    render() {
        
        return (
            
            <form 
                onSubmit={this.handleAddNewProject}
                className="newProject-form"
            >
                
                <input 
                    type="text" 
                    ref="projectRef" 
                    name="project_title" 
                    placeholder="Type project name"
                    autoFocus
                />

            </form>
        )
    }
}
