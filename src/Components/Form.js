import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateTweets } from "../ducks/reducer";

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweet: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.postTweetToServer = this.postTweetToServer.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    postTweetToServer(e) {
        e.preventDefault();
        const { tweet } = this.state;
        const newTweet = { tweet }
        axios.post("/api/tweets", newTweet).then(response => {
            if (response.data.length) {
                this.props.updateTweets(response.data);
            }
        })
    }

    render () {
        return (
            <div className="tweet-form">
                <form onSubmit={this.postTweetToServer} >
                    <textarea onChange={this.handleChange} type="text" name="tweet" rows="6" value={this.state.tweet} placeholder="Compose tweet..." />
                    <button type="submit">POST</button>
                </form>
            </div>
        );
    }
}

export default connect(null, { updateTweets })(Form);