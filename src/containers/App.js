import React from "react";
import Auth from "./Auth";
import Main from "./Main";
import style from "./App.scss";
// import "./App.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }
  setToken = token => {
    this.setState({ token });
  };
  render() {
    return (
      <Auth setToken={this.setToken}>
        <Main token={this.state.token} />
      </Auth>
    );
  }
}
