import React from "react";
import ReactDOM from "react-dom";
import UserList from "./userList";
import UserAdd from "./userAdd";
import UserDelete from "./userDelete";
import "./users.css";

const users = () => {
    return (
        <div>
            <h1>Users</h1>
            <p>Users page body content</p>
            <button
                onClick={() =>
                    ReactDOM.render(
                        <UserList />,
                        document.getElementById("workspace")
                    )
                }
            >
                Show
            </button>
            <button onClick={() =>
                    ReactDOM.render(
                        <UserAdd />,
                        document.getElementById("workspace")
                    )
                }>Add</button>
            <button onClick={() =>
                    ReactDOM.render(
                        <UserDelete />,
                        document.getElementById("workspace")
                    )
                }>Delete</button>
            <section id="workspace" />
        </div>
    );
};

export default users;
