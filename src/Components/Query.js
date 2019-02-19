import React, { Component } from "react";
import axios from "axios";

class Query extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            query: "",
            queryResponse: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value })
    }

    sendQuery() {
        const { query } = this.state;
        axios.post(`/api/search?query=${query}`).then(response => {
            this.setState({ queryResponse: response.data })
        })
    }

    render() { 
        return (  
            <div className="query-box">
                <input onChange={this.handleChange} type="text" name="query" placeholder="Make a query, bro" />
                <button onClick={this.sendQuery}>Send</button>
                {this.state.queryResponse}
            </div>
        );
    }
}
 
export default Query;