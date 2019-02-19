import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        const { tweets } = this.props;

        return (
            <div className="dash">
                <h2>MY TWEETS</h2> 
                {
                    tweets.map(tweet => 
                        //CREATE SEPERATE TWEET COMPONENT WITH EDIT 
                        <p>{tweet.content} <i className="fas fa-pen-square"></i></p>
                    );
                }
            </div>
        );
    }

}

function mapStateToProps(reduxState) {
    const { tweets } = reduxState;
    return { tweets }
}

export default connect(mapStateToProps)(Dashboard);