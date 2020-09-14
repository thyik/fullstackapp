import React from "react";
import TransactionList from './transactionList';

const transactions = () => {
    return (
        <div>
            <h1>Transactions</h1>

            <p>Transactions page body content</p>
            <TransactionList />
        </div>
    );
};

export default transactions;
