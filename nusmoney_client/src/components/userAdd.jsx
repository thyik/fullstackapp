import React, { Component } from "react";

import uuid from "uuid";

import FormContainer from './form/FormContainer';

class UserAdd extends Component {
    state = {
        items: [
            {
                user_id: uuid(),
                name: "Hell1",
                mail: "bb",
                nric: "",
                mobile: "",
            },
            {
                user_id: uuid(),
                name: "Hell2",
                mail: "aa",
                nric: "",
                mobile: "",
            },
        ],
    };

    callAPIServer() {}

    addUser(bodyData) {
        console.log(bodyData);
        // setup automatic proxy in package.json.
        // thus eliminating the need to type "http://localhost:7000"
        // "proxy" : "http://localhost:7000"
        fetch(`/users`, {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((res) => res.text())
            .then((data) => {
                console.log(data);

                //this.setState({ items: data });
                //console.log(this.state.user);
            })
            .catch((err) => {
                console.log(err);

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

        return <div><p>User Add</p><FormContainer /></div>;
    }
}

export default UserAdd;
