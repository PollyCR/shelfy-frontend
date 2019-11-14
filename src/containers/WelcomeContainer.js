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
      </div>
    );
  }
}

export default WelcomeContainer;
