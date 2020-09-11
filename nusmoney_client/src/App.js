import React from "react";
import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import UserList from "./components/userList";

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
                    <h1 className="App-title">
                        Welcome to FintechSG NUSBank
                    </h1>
                    {/* <h2 className="App-intro">{this.state.serverResponse}</h2> */}
                </header>
                <br></br>
                <UserList />
            </div>
        );
    }
}

export default App;
