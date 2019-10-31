import React from "react";
import "./App.css";
import { routes } from "./config/routes";
import { Route } from "react-router-dom";
import { Container, Message } from "semantic-ui-react";
import API from "./adapters/API";

const notFoundMessage = () => <Message negative>NOT FOUND</Message>;

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    API.validateUser().then(user => {
        this.setState({ user });
      // console.log(user)
      if (user.errors) {
        return <Message negative>{user.errors}</Message>
        this.props.history.push("/welcome");
      }
    })
  }

  login = user => {
  if (user.errors) {return null} else {
    this.setState({ user }, () => this.props.history.push('/dashboard'))}
  }

  setUser = user => this.setState({user})

  logout = () => {
    API.logout();
    this.setState({ user: null });
    this.props.history.push("/welcome");
  };


  render() {
    return (
      <div className="App">
        <Container >
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact
              component={routerProps =>
                route.component ? (
                  <route.component
                    {...routerProps}
                    user={this.state.user}
                    login={this.login}
                    logout={this.logout}
                    signup={this.signup}
                    setUser={this.setUser}

                  />
                ) : (
                  notFoundMessage()
                )
              }
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default App;
