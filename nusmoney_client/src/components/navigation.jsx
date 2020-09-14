import React from "react";

/* import { NavLink } from "react-router-dom"; */

import "./navigation.css";

const Navigation = () => {
    return (
        <nav id="navbar">
            <div class="container">
{/*                 <NavLink class="navigate" to="/">Home</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/accounts">Accounts</NavLink>
                <NavLink to="/transactions">Transactions</NavLink>
                <NavLink to="/messages">Messages</NavLink> */}
                <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/users">Users</a></li>
                <li><a href="/accounts">Accounts</a></li>
                <li><a href="/transactions">Transactions</a></li>
                <li><a href="/messages">Messages</a></li>
            </ul>                
            </div>
        </nav>
    );
};

export default Navigation;
