import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import API from "../adapters/API";

export class SignupForm extends Component {
  state = {
    display_name: "",
    email_address: "",
    password: ""
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
        <Form.Input
          name="display_name"
          type="display_name"
          placeholder="Please enter your name here!"
          autoComplete="name"
          value={this.state.display_name}
        />
        <Form.Input
          name="email_address"
          type="email"
          placeholder="Please enter your email address here!"
          autoComplete="email"
          value={this.state.email_address}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="Please enter your password here!"
          autoComplete="password"
          value={this.state.password}
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default SignupForm;
