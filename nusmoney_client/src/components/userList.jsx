import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import uuid from "uuid";

class UserList extends Component {
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

    callAPIServer() {
        /*         let bodyData = {
                    limit: 12,
                }; */

        // setup automatic proxy in package.json.
        // thus eliminating the need to type "http://localhost:7000"
        // "proxy" : "http://localhost:7000"
        fetch("/users?limit=0", {
            method: "GET",
            /* body: JSON.stringify(bodyData), */
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ items: data });
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

        return (
            <Container className="App-list">
                <ListGroup>
                    <TransitionGroup className="user-list">
                        {items.map(({ user_id, name, mail, nric, mobile }) => (
                            <CSSTransition
                                key={user_id}
                                timeout={500}
                                /* className="fade" */
                            >
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            this.deleteUser(user_id);
                                            console.log(`Delete ${user_id}`);
                                        }}
                                    >
                                        &times;
                                    </Button>
                                    {user_id} {name} {nric} {mail} {mobile}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

export default UserList;
