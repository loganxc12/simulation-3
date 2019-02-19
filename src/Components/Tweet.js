import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateTweets } from "../ducks/reducer";

class Tweet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweetContent: props.tweet.content,
            edit: false
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateTweetOnServer = this.updateTweetOnServer.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    toggleEdit() {
        this.setState(prevState => ({
            edit: !prevState.edit
        }))
    }

    updateTweetOnServer(id) {
        const tweet = this.state.tweetContent;
        const updatedTweet = { tweet };
        axios.put(`/api/tweets/${id}`, updatedTweet).then(response => {
            console.log(response);
            const tweet = response.data[0];
            const updatedTweets = this.props.tweets.map(el => {
                return el.id === tweet.id ? tweet : el; 
            })
            console.log("----updated tweets", updatedTweets);
            if (response.data.length) {
                this.props.updateTweets(updatedTweets);
            }
            this.toggleEdit();
        })
    }

    render() {
        const { edit, tweetContent } = this.state;
        const { tweet } = this.props;
        return edit ? (
            <div className="tweet">
                <i onClick={() => this.updateTweetOnServer(tweet.id)}className="fas fa-check-square save"></i>
                <i onClick={this.toggleEdit} className="fas fa-times-circle cancel"></i>
                <textarea onChange={this.handleChange} value={tweetContent} name="tweetContent" />
            </div>
        ) : (
            <div className="tweet">
                <i onClick={this.toggleEdit} className="fas fa-pen-square"></i>
                <p>{tweet.content}</p>
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    const { tweets } = reduxState;
    return { tweets };
}

export default connect(mapStateToProps, { updateTweets })(Tweet);