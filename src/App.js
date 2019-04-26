import React, { Component } from 'react';
import firebase from './firebase.js';
import Authenticate from './components/Authenticate';
import Home from './components/Home';
import './css/main.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      user : {},
      userProjects : []
    }

  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {

      if(user) {

        let currentUser = {
          email : user.email,
          id : user.uid,
        }
        
        // loading shouldn't stop here
        this.setState({ user : currentUser });
        this.loadUserProjects(this.state.user.id);

      } else {
        this.setState({ user : null, loading : false  });
      }


    });
  }

  handleLogOut = () => {
    this.setState({ userProjects : []  });
  }


  loadEmptyState(){
    this.setState({ emptyState : true  });
  }



  loadUserProjects(userId){

    this.setState({ 
      userProjects : []  
    });
    
    let { userProjects } = this.state;

    let ref = firebase.database().ref("projects").orderByChild("ownerId").equalTo(userId);
  
    ref.on('child_added', snapshot => {
      let project = snapshot.val();
      userProjects.push(project)
      this.setState({
          userProjects
      });


    });

    this.setState({ loading : false });
    
  }
  


  render() {


    let {user, loading} = this.state;


    return (
      <div className="main-wrap">

        { loading && 
          <span>this is loading......</span>
        }

        { !user && 
          <Authenticate
            user = {this.state.user}
          /> 
        }

        { !loading && user &&
          <Home
            user = {this.state.user}
            userProjects = {this.state.userProjects}
            handleLogOut = {this.handleLogOut}
            loadUserProjects = {this.loadUserProjects.bind(this)}
          /> 
        }

      </div>
    );
  }
}

export default App;
