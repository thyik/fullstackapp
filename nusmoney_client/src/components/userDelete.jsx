import React, { Component } from "react";
import apiFetch from '../logic/usersFetch';

import uuid from "uuid";

class UserDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            isGoing: true,
            numberOfGuests: 2,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handling Multiple Inputs 
    handleInputChange(event) {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    //
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        alert(`User Id  ${this.state.value} was submitted`);
        event.preventDefault();

        apiFetch.deleteUser(this.state.value);
    }

    callAPIServer() {

    }

    componentDidMount() {
        // react lifecycle method componentDidMount()
        // will execute the callAPIServer() methods afteer the component mounts
        this.callAPIServer();
    }

    render() {
        // destructure {}
        const { items } = this.state;

        return (
            <div><p>User Delete</p>
                <form onSubmit={this.handleSubmit}>
                <label>
                    User Id:
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default UserDelete;
