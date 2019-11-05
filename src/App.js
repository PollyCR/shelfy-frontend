import React from "react";
import "./App.css";
import { routes } from "./config/routes";
import { Route } from "react-router-dom";
import { Container, Message } from "semantic-ui-react";
import API from "./adapters/API";

const notFoundMessage = () => <Message negative>NOT FOUND</Message>;

class App extends React.Component {
  state = {
    user: null,
    selectedProduct: null,
    brands: []
  };

  componentDidMount() {
    API.validateUser().then(user => {
        this.setState({ user });
      // console.log(user)
      if (user && user.errors) {
        this.props.history.push("/welcome");
      } else if (user) {
        this.props.history.push("/dashboard")
      }
    })
  }

  handleRoutineClick = product => {
    this.setState({selectedProduct: product})
    this.props.history.push("/brands/add")
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
                    handleRoutineClick = {this.handleRoutineClick}
                    selectedProduct = {this.state.selectedProduct}
                    brands = {this.state.brands}

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
