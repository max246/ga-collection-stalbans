import React, { Component } from "react";
import "./App.css";
import Collection from "./Collection";
import CollectionSetup from "./CollectionSetup";

class App extends Component {
  constructor(...props) {
    super(props);
    this.state = { currentView: "HOME", data: null };
  }

  switchView = (view, data) => {
    this.setState((prevState) => {
      return { currentView: view, data: data };
    });
  };
  render() {
    let view;
    if (this.state.currentView === "COLLECTION")
      view = <Collection data={this.state.data.dates} />;
    else if (this.state.currentView === "COLLECTION_SETUP")
      view = <CollectionSetup data={this.state.data} />;
    else {
      if (this.state.data && this.state.data.dates)
      view = <Collection data={this.state.data.dates}/>;
    }

    return (
      <div className="App">
        <header className="App-header">{view}</header>
      </div>
    );
  }
}

export default App;
