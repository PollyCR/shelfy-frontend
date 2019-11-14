import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export class WelcomeContainer extends Component {
  render() {
    return (
      <div>
        <Link to="/login">
          <Button className="log-in-or-sign-up" basic>
            log in
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="log-in-or-sign-up" basic>
            sign up
          </Button>
        </Link>
        <br />
        <br />
        <p class = "app-intro">Shelfy helps you manage your skin. <br />
        Add your own products to your routines or find new ones from the
        user-submitted database, remember what you're buying next with the
        built-in shopping list, and keep track of your skin's progress through
        your personal skin diary.</p>
      </div>
    );
  }
}

export default WelcomeContainer;
