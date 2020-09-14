import React, { Component } from "react";

import Input from "./Input";
import Button from "./Button";
import uuid from "uuid";

class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                user_id: uuid(),
                name: "",
                mail: "",
                nric: "",
                mobile: "",
            },
        };
        //
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);

        this.handleInput = this.handleInput.bind(this);
    }

    ButtonStyle = {
        width: "100%",
        backgroundColor: "#F6F6F6",
        color: "#404040",
        padding: "8px 15px",
        boxSizing: "content-box",
        position: "fixed",
        bottom: "0",
    };

    handleFormSubmit(e) {
        e.preventDefault();
        let userData = this.state.newUser;
        console.log("Form submit");
        this.addUser(userData);
    }

    handleClearForm(e) {
        e.preventDefault();
        console.log("Clear Form");
        this.setState({
            newUser: {
                user_id: uuid(),
                name: "",
                mail: "",
                nric: "",
                mobile: "",
            },
        });
    }

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
                return true;
            })
            .catch((err) => {
                console.log(err);

                return false;
            });
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
            (prevState) => {
                return {
                    newUser: {
                        ...prevState.newUser,
                        [name]: value,
                    },
                };
            },
            () => console.log(this.state.newUser)
        );
    }

    render() {
        return (
            <form className="container">
                <Input
                    type={"text"}
                    title={"ID"}
                    name={"user_id"}
                    value={this.state.newUser.user_id}
                    placeholder={"Enter your id"}
                    handleChange={this.handleInput}
                />
                {/* user id */}
                <Input
                    type={"text"}
                    title={"Full Name"}
                    name={"name"}
                    value={this.state.newUser.name}
                    placeholder={"Enter your name"}
                    handleChange={this.handleInput}
                />
                {/* Name of the user */}
                <Input
                    type={"text"}
                    title={"Email"}
                    name={"mail"}
                    value={this.state.newUser.mail}
                    placeholder={"Enter your email"}
                    handleChange={this.handleInput}
                />
                <Input
                    type={"text"}
                    title={"NRIC"}
                    name={"nric"}
                    value={this.state.newUser.nric}
                    placeholder={"Enter your NRIC"}
                    handleChange={this.handleInput}
                />
                <Input
                    type={"text"}
                    title={"Mobile"}
                    name={"mobile"}
                    value={this.state.newUser.mobile}
                    placeholder={"Enter your mobile number"}
                    handleChange={this.handleInput}
                />
                {/* Name of the user */}
                <Button action={this.handleClearForm} title="Clear" />
                {/* Clear the form */}
                <Button action={this.handleFormSubmit} title="Submit" />
                {/*Submit */}
            </form>
        );
    }
}

export default FormContainer;
