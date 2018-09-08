import React from "react";

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      token: "",
      clientId: 6683807
    };
  }
  componentDidMount() {
    const hash = window.location.hash;
    if (hash) {
      const token = hash
        .slice(1)
        .split("&")
        .filter(params => params.indexOf("access_token=") !== -1)[0]
        .split("=")[1];
      this.props.setToken(token);
      this.setState({ token, loaded: true });
    }
  }
  render() {
    const { loaded, clientId } = this.state;
    const { children } = this.props;
    if (!loaded) {
      return (
        <div style={{ marginTop: 20 }}>
          <a
            className="button"
            href={`https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=http://localhost:8080&scope=friends,photos&response_type=token&v=5.52`}
          >
            Получить токен
          </a>
        </div>
      );
    } else {
      return children;
    }
  }
}
