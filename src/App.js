import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Subscription from "./Apollo/HasuraApolloClient";

class App extends Component {
  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}

export default App;
