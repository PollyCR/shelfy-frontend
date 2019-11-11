import React from "react";
import "./App.css";
import { routes } from "./config/routes";
import { Route } from "react-router-dom";
import { Container, Message} from "semantic-ui-react";
import API from "./adapters/API";

const notFoundMessage = () => <Message negative>NOT FOUND</Message>;

class App extends React.Component {
  state = {
    user: null,
    brands: [],
    products: []
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
    }, API.getBrands().then(data => this.setState({brands: data})), API.getProducts().then(data => this.setState({products:data})))
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
      <div className = "background">
        <Container className = "main-container">
      <h1>Shelfy</h1>
      <h4>Your skin, made smarter</h4>
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
                    brands = {this.state.brands}
                    products = {this.state.products}
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
