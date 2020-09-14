import React from "react";
import MessageList from './messageList';

const messages = () => {
    return (
        <div>
            <h1>Messages</h1>
            <p>Messages page body content</p>
            <MessageList />
        </div>
    );
};

export default messages;
