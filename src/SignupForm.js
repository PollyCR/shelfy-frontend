import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import API from "./adapters/API";

export class SignupForm extends Component {
  componentDidMount = () => {
    this.setState({ display_name: "", email_address: "", password: "" });
  };

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  submit = e => {
    e.preventDefault();
    API.signup({
      display_name: this.state.display_name,
      email_address: this.state.email_address,
      password: this.state.password
    }).then(user => this.props.login(user));
  };

  render() {
    return (
      <Form
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
      >
        <h1 className="main-title">welcome to Shelfy!</h1>
        <br />
        <p className="sign-up-rules">
          when you sign up, please make sure that:
          <li className="sign-up-rules-li">
            you submit a valid, unique email address
          </li>
          <li className="sign-up-rules-li">
            your password is eight characters or longer
          </li>
        </p>
        <Form.Input
          name="display_name"
          type="display_name"
          placeholder="please enter your name here!"
          autoComplete="name"
          value={this.state.display_name}
        />
        <Form.Input
          name="email_address"
          type="email"
          placeholder="please enter your email address here!"
          autoComplete="email"
          value={this.state.email_address}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="please enter your password here!"
          autoComplete="password"
          value={this.state.password}
        />
        <Form.Button basic>submit</Form.Button>

        <Button basic onClick={() => this.props.history.push("/welcome")}>
          go back
        </Button>
      </Form>
    );
  }
}

export default SignupForm;
