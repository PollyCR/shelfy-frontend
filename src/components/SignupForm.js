import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
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
      <div><Form
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
      >
        Welcome to Shelfy!<br />
        When you sign up, please make sure that:
        <ul>You submit a valid, unique email address</ul>
        <ul>Your password is eight characters or longer</ul>
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
        <Form.Button basic >Submit</Form.Button>
      </Form>
            <Button basic onClick= {() => this.props.history.push("/welcome")}>Go back</Button></div>
    );
  }
}

export default SignupForm;
