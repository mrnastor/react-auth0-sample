import './App.css';

import React, { Component } from "react";
import {Route} from "react-router-dom";
import TvShows from "./components/TvShows.js";
import Movies from "./components/Movies.js";
import auth from "./auth";
import AuthCallback from "./auth/AuthCallback";

class App extends Component {
  constructor(props) {
    super(props);

    auth.loginCallback = this.loggedIn.bind(this);
    auth.logoutCallback = this.loggedOut.bind(this);

    this.state = { loggedIn: false };
  }

  loggedIn() {
    this.setState({ loggedIn: true });
  }

  loggedOut() {
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? <Movies /> : <TvShows />}
        {this.state.loggedIn ? (
          <button onClick={() => auth.logout()} className="log-in">
            Log Out
          </button>
        ) : (
          <button onClick={() => auth.login()} className="log-in">
            Log In
          </button>
        )}
        <Route exact path='/callback' component={AuthCallback}/>
      </div>
    );
  }
}

export default App;
