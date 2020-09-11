import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import uuid from "uuid";

class UserList extends Component {
    state = {
        items: [
            { id: uuid(), name: "Hell1", mail: "bb", nric: "" },
            { id: uuid(), name: "Hell2", mail: "aa", nric: "" },
        ],
    };

    render() {
        // destructure {}
        const { items } = this.state;

        return (
            <Container>
                <Button
                    color="dark"
                    style={{ marginBottom: "2em" }}
                    onClick={() => {
                        const name = prompt("Enter name");
                        if (name) {
                            this.setState((state) => ({
                                items: [
                                    ...state.items,
                                    {
                                        id: uuid(),
                                        name: name,
                                        mail: "b@ccd",
                                        nric: "SSS",
                                    },
                                ],
                            }));
                        }
                    }}
                >
                    Add User
                </Button>

                <ListGroup>
                    <TransitionGroup className="user-list">
                        {items.map(({ id, name, mail, nric }) => (
                            <CSSTransition
                                key={id}
                                timeout={500}
                                /* className="fade" */
                            >
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            console.log(`Delete ${id}`);
                                        }}
                                    >
                                        &times;
                                    </Button>
                                    {name} {nric} {mail}
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
