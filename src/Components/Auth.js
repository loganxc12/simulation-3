import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../ducks/reducer";

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.postUserToServer = this.postUserToServer.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    postUserToServer() {
        const { username, password } = this.state;
        const newUser = { username, password };
        axios.post("/api/register", newUser).then(response => {
            console.log(response);
            if (response.data.length) { 
                this.setState({ redirect: true })
            }
        })
    }

    loginUser() {
        const { username, password } = this.state;
        const user = { username, password };
        axios.post("/api/login", user).then(response => {
            console.log(response);
            if (response.data.user) { 
                this.props.updateUser(response.data.user);
                this.setState({ redirect: true })
            }
        })
    }

    render () {
        if (this.state.redirect) { return <Redirect to="/dashboard" /> }
        return (
            <div className="login-box">
                <label>Username:</label>
                <input name="username" onChange={this.handleChange}></input>
                <label>Password:</label>
                <input name="password" onChange={this.handleChange}></input>
                <button onClick={this.loginUser}>Login</button>
                <button onClick={this.postUserToServer}>Register</button>
            </div>
        );
    }
}

export default connect(null, { updateUser })(Auth);