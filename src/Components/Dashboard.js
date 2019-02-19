import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Tweet from "./Tweet";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value })
    }

    render () {
        let tweetsToDisplay = this.props.tweets.map(tweet => 
            <Tweet tweet={tweet} />
        );
        return (
            <div className="dash">
                <h2>MY TWEETS</h2> 
                <div className="search-box">
                    <input onChange={this.handleChange} type="text" placeholder="Search yo' tweets" value={this.state.search} />
                    <button>Search</button>
                </div>
                { tweetsToDisplay }
            </div>
        );
    }

}

function mapStateToProps(reduxState) {
    const { tweets } = reduxState;
    return { tweets }
}

export default connect(mapStateToProps)(Dashboard);