import React, { Component } from "react";
import Datatable from "react-bs-datatable";

class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
        this.header = [
            { title: "ID", prop: "id", sortable: true, filterable: true },
            { title: "Account Number", prop: "acct_number", sortable: true, filterable: true },
            {
                title: "Date",
                prop: "date",
                sortable: true,
                filterable: true,
            },
            { title: "Type", prop: "type", sortable: true, filterable: true },
            { title: "Amount", prop: "amount", sortable: true, filterable: true },
        ];
    }


    callAPIServer() {
        /*         let bodyData = {
                    limit: 12,
                }; */

        // setup automatic proxy in package.json.
        // thus eliminating the need to type "http://localhost:7000"
        // "proxy" : "http://localhost:7000"
        fetch("/transactions?limit=18", {
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
                        keyName="transactionTable"
                        tableClass="striped hover responsive"
                        rowsPerPage={3}
                        rowsPerPageOption={[3, 5, 8, 10]}
                        initialSort={{ prop: "id", isAscending: true }}
                    />
                </div>
            );
        }
    }
}

export default TransactionList;
