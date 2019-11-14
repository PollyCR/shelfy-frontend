import React from "react";
import "./App.css";
import { routes } from "./config/routes";
import { Link, Route } from "react-router-dom";
import { Container, Message, Placeholder } from "semantic-ui-react";
import API from "./adapters/API";
import "semantic-ui-less/semantic.less";

const notFoundMessage = () => {
  return <Message negative>NOT FOUND</Message>;
};

class App extends React.Component {
  state = {
    user: null,
    brands: [],
    products: [],
    errors: false
  };

  logOutOrError = () => {
    if (this.state.user && !this.state.user.errors) {
      return (
        <div id="log-out-link-container">
          <Link id="log-out-link" to="/logout">
            Logout
          </Link>
          <br />{" "}
        </div>
      );
    } else if (this.state.user && this.state.errors === true) {
      return <Message>invalid email or password. please try again!</Message>;
    }
  };

  componentDidMount() {
    API.validateUser().then(
      user => {
        this.setState({ user });
        // console.log(user)
        if (!user || (user && user.errors)) {
          this.props.history.push("/welcome");
        } else if (user) {
          this.props.history.push("/dashboard");
        }
      },
      API.getBrands().then(data => this.setState({ brands: data })),
      API.getProducts().then(data => this.setState({ products: data }))
    );
  }

  handleRoutineClick = product => {
    this.setState({ selectedProduct: product });
    this.props.history.push("/brands/add");
  };

  login = user => {
    if (user.errors) {
      // return <p>Invalid email address or password. Please try again.</p>;
      this.setState({ errors: true });
      return user.errors;
    } else {
      this.setState({ user }, () => this.props.history.push("/dashboard"));
    }
  };

  setUser = user => this.setState({ user });

  logout = () => {
    API.logout();
    this.setState({ user: null });
    this.props.history.push("/welcome");
  };

  floatRight = {
    alignSelf: "right"
  };

  render() {
    return (
      <div className="background">
        {this.logOutOrError()}

        <Container className="main-container">
          <h1 className="logo">Shelfy</h1>
          <h4 className="strapline">Your skincare, but smarter.</h4>
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
                    errors={this.state.errors}
                    logout={this.logout}
                    signup={this.signup}
                    setUser={this.setUser}
                    handleRoutineClick={this.handleRoutineClick}
                    brands={this.state.brands}
                    products={this.state.products}
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
