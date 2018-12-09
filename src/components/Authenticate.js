import React, { Component } from 'react'

export default class Authenticate extends Component {

    constructor(){
        super();

        this.state = ({
            newUser : false
        })
    }        


    render() {

        let { newUser } = this.state;

        let Register = () => {
            return (
                <div>
                    <h3>Register to continue</h3>
                    <form>
                        <label>
                            <input type="text" name="email" />
                        </label>
                        <label>
                            <input type="password" name="pass" />
                        </label>
                        <label>
                            <input type="password" name="confirm-pass" />
                        </label>
                        <button type="submit">Register</button>
                    </form>
                </div>
            );
        };


        let Login = () => {
            return (
                <div>
                    <h3>Login to continue</h3>
                    <form>
                        <label>
                            <input type="text" name="email" />
                        </label>                        
                        <label>
                            <input type="password" name="pass" />
                        </label>
                        <button type="submit">Login</button>
                    </form>
                    <a href="link">Register if no account</a>
                </div>
            );
        };


        return (
        <div className="auth-container">
            { newUser ? <Register /> : <Login /> }
        </div>
        )
    }
}
