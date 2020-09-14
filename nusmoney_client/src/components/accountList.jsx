import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import uuid from "uuid";

class AccountList extends Component {
    state = {
        items: [
            {
                user_id: uuid(),
                acct_type: "saving",
                acct_number: "1111",
                balance: 0.0,
                date_created: "",
                max_limit: 0.0
            }
        ],
    };

    callAPIServer() {
        /*         let bodyData = {
                    limit: 12,
                }; */

        // setup automatic proxy in package.json.
        // thus eliminating the need to type "http://localhost:7000"
        // "proxy" : "http://localhost:7000"
        fetch("/accounts?limit=18", {
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

    addAccount(bodyData) {

        console.log(bodyData);
        // setup automatic proxy in package.json.
        // thus eliminating the need to type "http://localhost:7000"
        // "proxy" : "http://localhost:7000"
        fetch(`/accounts`, {
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

    deleteAccount(id) {

        // setup automatic proxy in package.json.
        // thus eliminating the need to type "http://localhost:7000"
        // "proxy" : "http://localhost:7000"
        fetch(`/accounts/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert(`Deleted user ${id}`);
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
            <Container className="App-list">
                <Button
                    color="dark"
                    style={{ marginBottom: "2em" }}
                    onClick={() => {
                        this.addAccount( {
                            user_id: uuid(),
                            acct_type: "saving",
                            acct_number: "1111",
                            balance: 1000.0,
                            date_created: "",
                            max_limit: 100000.0
                        });

                    }}
                >
                    Add Account
                </Button>

                <ListGroup>
                    <TransitionGroup className="user-list">
                        {items.map(({ user_id, acct_type, acct_number, balance, date_created, max_limit }) => (
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
                                            this.deleteAccount(user_id);
                                            console.log(`Delete ${user_id}`);
                                        }}
                                    >
                                        &times;
                                    </Button>
                                    {user_id} {acct_type} {acct_number} {balance} {date_created}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

export default AccountList;
