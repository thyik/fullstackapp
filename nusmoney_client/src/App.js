import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navigation from "./components/navigation";
import home from "./components/home";
import users from "./components/users";
import accounts from "./components/accounts";
import transactions from "./components/transactions";
import messages from "./components/messages";
import error from "./components/error";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { serverResponse: "" };
    }

    componentDidMount() {
        // react lifecycle method componentDidMount()
        // will execute the callAPIServer() methods afteer the component mounts
        console.log("App Mounted");
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to FintechSG NUSBank</h1>
                    {/* <h2 className="App-intro">{this.state.serverResponse}</h2> */}
                </header>

                <BrowserRouter>
                    <div>
                        <Navigation />
                        <Switch>
                            <Route path="/" component={home} exact />
                            <Route path="/users" component={users} />
                            <Route path="/accounts" component={accounts} />
                            <Route
                                path="/transactions"
                                component={transactions}
                            />
                            <Route path="/messages" component={messages} />
                            <Route component={error} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
