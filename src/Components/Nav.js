import React, { Component } from "react";
import axios from "axios";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser, updateTweets } from "../ducks/reducer";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.getUserFromServer = this.getUserFromServer.bind(this);
        this.getTweetsFromServer = this.getTweetsFromServer.bind(this);
    }

    componentDidMount() {
        this.getUserFromServer();
    }

    componentDidUpdate(prevProps) {
        if (this.props.user && (this.props !== prevProps)) {
            this.getTweetsFromServer();
        }
    }

    getUserFromServer() {
        axios.get("/api/user").then(response => {
            console.log(response);
            this.props.updateUser(response.data.user);
        })
    }

    getTweetsFromServer() {
        axios.get("/api/tweets").then(response => {
            console.log(response);
            this.props.updateTweets(response.data);
        })
    }

    render() {
        const { pathname } = this.props.location;
        console.log(this.props);
        return pathname !== "/" ? (
            <div className="nav">
                <h3>{this.props.username}</h3>
                {/* <img src={props.profile_pic} alt="profile" /> */}
                <NavLink to="/dashboard" activeClassName="selected"><button>Home</button></NavLink>
                <NavLink to="/new" activeClassName="selected"><button>New Tweet</button></NavLink>
                <NavLink to="/" activeClassName="selected" exact><button>Logout</button></NavLink>
            </div>
        ) : null;
    } 
}

function mapStateToProps(reduxState) {
     const { user } = reduxState;
     return { user };
}

export default withRouter(connect(mapStateToProps, { updateUser, updateTweets })(Nav));