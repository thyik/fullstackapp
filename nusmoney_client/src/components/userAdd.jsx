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
