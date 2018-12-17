import React, { Component } from 'react';

class ProjectPane extends Component {
    render() {
        return (
            <div className="project-pane">
                {this.props.children}
            </div>
        );
    }
}

export default ProjectPane;