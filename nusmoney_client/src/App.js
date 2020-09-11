import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { serverResponse: "", user: [] };
    }

    callAPIServer() {
/*         let bodyData = {
            limit: 12,
        }; */

        // setup automatic proxy in package.json.
        // thus eliminating the need to type "http://localhost:7000"
        // "proxy" : "http://localhost:7000"
        fetch("/users?limit=18", {
            method: "GET",
            /* body: JSON.stringify(bodyData), */
            headers: { "Content-type": "application/json; charset=UTF-8" },
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ serverResponse: JSON.stringify(data), user: data });
                console.log(this.state.user);
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
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">
                        Welcome to FintechSG React Course
                    </h1>
                    {/* <h2 className="App-intro">{this.state.serverResponse}</h2> */}
                </header>
                <div className="App-list">
                    <ul>
                        {this.state.user.map(({ user_id, name, mail, nric}) => (
                            <li key={user_id}>
                                {user_id} {name} {nric} {mail}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
