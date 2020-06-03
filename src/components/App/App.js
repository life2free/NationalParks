import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NationalParkList from "../NationalParks/NationalParkList";
import NationalPark from "../NationalPark/NationalPark";
import "./App.css";
import logo from "./logo.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nationalParkList: [],
      nationalPark: null
    };
  }

  setNationalParkList = nationalParkList => {
    this.setState({ nationalParkList: nationalParkList });
  };

  setNationalPark = nationalPark => {
    this.setState({ nationalPark: nationalPark });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/" className="nationalparklist-link">
            <span className="App-header-info">National Parks</span>
          </Link>
        </header>
        <main className="App-main">
          <Route
            path="/"
            exact
            render={() => (
              <NationalParkList
                setNationalParkList={this.setNationalParkList}
                {...this.state}
              />
            )}
          />
          <Route
            path="/nationalpark/:parkCode"
            render={routerProps => (
              <NationalPark
                setNationalPark={this.setNationalPark}
                {...routerProps}
                {...this.state}
              />
            )}
          />
        </main>
        <footer className="App-footer">
          <div className="App-footer-container">
            <div className="App-footer-container-info">
              <p className="App-footer-container-info-service">
                National Park Service
              </p>
              <p className="App-footer-container-info-department">
                U.S. Department of the Interior
              </p>
            </div>
            <div className="App-footer-container-img">
              <img src={logo} alt="National Park Service" />
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
