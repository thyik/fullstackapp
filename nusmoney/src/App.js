import React from "react";
import logo from "./brand-logo.png"
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newBank: "",
      bankList: []
    };
  }

  addBank(bankName) {
    if (bankName !== "") {
      const newBank = {
        id: Date.now(),
        value: bankName,
        isDone: false
      };
      const bankList = [...this.state.bankList];  //get the Banklist from state
      bankList.push(newBank); //add new back to the list

      this.setState({   //update the state
        bankList,
        newBank: ""
      });
    }
  }

  deleteItem(id) {
    const bankList = [...this.state.bankList];
    //const updatedbankList = bankList.filter(item => item.id !== id);
    const updatedbankList = bankList.filter(function(item){return item.id !== id});
    this.setState({ bankList: updatedbankList });
  }

  updateInput(input) {
    this.setState({ newBank: input });
  }

  render() {
    return (
      <div>
        <img src={logo} width="50"  alt="brand logo" className="logo" />
        <h1 className="app-title">Fintech@SG NUSmoney App</h1>
        <div className="container">
          Add your new Bank....
          <br />
          <input
            type="text"
            className="input-text"
            placeholder="Input your new bank"
            required
            value={this.state.newBank}
            onChange={e => this.updateInput(e.target.value)}
          />
          <button
            className="add-btn"
            onClick={() => this.addBank(this.state.newBank)}
            disabled={!this.state.newBank.length}
          >
            Add Bank
          </button>
          <div className="list">
            <ul>
              {this.state.bankList.map( (item) => {
                 return (
                  <li key={item.id}>
          
                    {item.value}
                    <button
                      className="btn"
                      onClick={() => this.deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </li>
                )
                }
              )}
              <li>
                DBS Bank
                <button className="btn">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
