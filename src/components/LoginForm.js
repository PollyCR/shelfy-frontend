
import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import API from '../adapters/API'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    error: false
  }

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  submit = e => {
    e.preventDefault()
    API.login({ email_address: this.state.email, password: this.state.password }).then(user => this.props.login(user));
  }

  render() {
    return (
      <div>
        <Form
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
      >
        {this.state.error ? <div style={{color: 'black'}}>Invalid Email or Password. Please try again.</div> : null}
        <Form.Input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={this.state.email}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="password"
          value={this.state.password}
        />
        <Form.Button basic >Submit</Form.Button>
      </Form>
      <Button basic onClick= {() => this.props.history.push("/welcome")}>Go back</Button>
      </div>
    )
  }
}

export default LoginForm