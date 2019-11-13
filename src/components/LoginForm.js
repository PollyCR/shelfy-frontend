import React from "react";
import { Form, Button } from "semantic-ui-react";
import API from "../adapters/API";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
    errors: false
  };

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  submit = e => {
    e.preventDefault();
    API.login({
      email_address: this.state.email,
      password: this.state.password
    }).then(user => this.props.login(user));
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={this.submit}
          onChange={e => this.handleInputChange(e.target.name, e.target.value)}
        >
          {/* {this.props.user && this.props.user.errors ? (
            // <div style={{ color: "black" }}>
            //   invalid email or password. please try again.
            // </div>
          ) : null} */}
          <Form.Input
            name="email"
            type="email"
            placeholder="email"
            autoComplete="email"
            value={this.state.email}
          />
          <Form.Input
            name="password"
            type="password"
            placeholder="password"
            autoComplete="password"
            value={this.state.password}
          />
          <Form.Button basic>submit</Form.Button>
        </Form>
        <Button basic onClick={() => this.props.history.push("/welcome")}>
          go back
        </Button>
      </div>
    );
  }
}

export default LoginForm;
