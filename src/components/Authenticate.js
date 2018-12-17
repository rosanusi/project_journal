import React, { Component } from 'react'
import firebase from './../firebase.js';
// import uiud from 'uuidv4';

export default class Authenticate extends Component {

    constructor(props){
        super(props);

        this.state = {
            newUser : false,
            user : null
        }
    }       
    
    handleAuth(e) {

        e.preventDefault();

        // let displayName;
        // if(e.target.name === 'register'){ 
        //     displayName = this.refs.nameRef.value;
        // }
        let email = this.refs.emailRef.value;
        let password = this.refs.passwordRef.value;

        if(e.target.name === 'login'){

            firebase.auth().signInWithEmailAndPassword(email, password)

            .catch(function(error) {
                console.log(error.message);
            });



        } else {

            firebase.auth().createUserWithEmailAndPassword(email, password)

            .catch(function(error) {
                
            });

        }
            
    }


    setNewUser = (e) => {
        this.setState({ newUser : true  });
    }

    setMember = (e) => {
        this.setState({ newUser : false  });
    }
    

    render() {

        let { newUser } = this.state;


        return (
        <div className="auth-container">


            { newUser && // Register
                <div>
                    <h3>Register to continue</h3>
                    <form onSubmit={(e) => this.handleAuth(e)} name="register">
                        <label>First Name</label>
                        <input type="text" name="displayName" ref="nameRef" />                        
                        <label>username</label>
                        <input type="text" name="email" ref="emailRef" />
                        <label>password</label>
                        <input type="password" ref="passwordRef" name="password" />
                        <button type="submit">Register</button>
                    </form>
                    <span>have an account already? <button type="button" onClick={this.setMember}>Login now</button></span>
                </div>
            }


            { !newUser &&  // Login 
                <div>
                    <h3>Login to continue</h3>
                    <form onSubmit={(e) => this.handleAuth(e)} name="login"> 
                        <label>Email</label>
                        <input type="text" ref="emailRef" name="email" />
                        <label>Password</label>
                        <input type="password" ref="passwordRef" name="password" />
                        <button type="submit">Login</button>
                    </form>
                    <span>New user? <button type="button" onClick={this.setNewUser}>Sign up now</button></span>
                </div>
            }

        </div>
        )
    }
}