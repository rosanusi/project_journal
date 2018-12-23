import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
        <div className="header-container">
            <div className="logo"></div>
            <div className="currentUser">
                <span className="name">{this.props.user.email}</span>
                <button type="button" className="linklike-btn logout-btn" onClick={this.logout}>Log out</button>            
            </div>
        </div>
    )
  }
}
