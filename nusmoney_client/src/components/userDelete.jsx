import React, { Component } from "react";

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

        this.deleteUser(this.state.value);
    }
    

    callAPIServer() {

    }

    deleteUser(id) {

        // setup automatic proxy in package.json.
        // thus eliminating the need to type "http://localhost:7000"
        // "proxy" : "http://localhost:7000"
        fetch(`/users/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                //alert(`Deleted user ${id}`);
                //this.setState({ items: data });
                //console.log(this.state.user);
            })
            .catch((err) => {
                console.log(err);
                alert(`Fail to delete user ${id}`);
                return err;
            });
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
