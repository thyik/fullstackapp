import React, { Component } from "react";
import Datatable from "react-bs-datatable";

class AccountList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
        this.header = [
            { title: "ID", prop: "user_id", sortable: true, filterable: true },
            {
                title: "Account Type",
                prop: "acct_type",
                sortable: true,
                filterable: true,
            },
            { title: "Account Number", prop: "acct_number", sortable: true, filterable: true },
            {
                title: "Balance",
                prop: "balance",
                sortable: true,
                filterable: true,
            },
        ];
    }


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
                this.setState({
                    isLoaded: true,

                    items: data
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    });
                });
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
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(this.state.items);
            return (
                <div class="container">
                    <Datatable
                        tableHeaders={this.header}
                        tableBody={this.state.items}
                        keyName="accountTable"
                        tableClass="striped hover responsive"
                        rowsPerPage={3}
                        rowsPerPageOption={[3, 5, 8, 10]}
                        initialSort={{ prop: "user_id", isAscending: true }}
                    />
                </div>
            );
        }
    }
}

export default AccountList;
