import React, { Component } from "react";
import MorningRoutine from "./MorningRoutine";
import EveningRoutine from "./EveningRoutine";
import { Button, Divider } from "semantic-ui-react";
import API from "./adapters/API";

export class DashboardContainer extends Component {
  componentDidMount = () => {
    API.validateUser().then(user => {
      this.setState({ user, routine: null });
      // console.log(user)
      if (user && user.errors) {
        this.props.history.push("/welcome");
      }
    });
  };

  getTime = () => {
    let today = new Date();
    let time = today.getHours();
    return time;
  };

  handleClick = e => {
    e.persist();
    e.preventDefault();
    this.props
      .setUserState()
      .then(() => this.props.history.push(`/${e.target.value}`));
  };

  getRoutine = () => {
    let currentTime = this.getTime();
    if (currentTime >= 22 || currentTime < 10) {
      return (
        <MorningRoutine
          setProducts={this.props.setProducts}
          user={this.props.user}
        />
      );
    } else {
      return (
        <EveningRoutine
          setProducts={this.props.setProducts}
          user={this.props.user}
        />
      );
    }
  };
  render() {
    return (
      <div>
        <Divider hidden />
        <div>{this.getRoutine()}</div>
        <Button.Group basic vertical size="large">
          <Button
            className="am-routine-button"
            value="am"
            onClick={this.handleClick}
          >
            am
          </Button>
          <Button
            className="pm-routine-button"
            value="pm"
            onClick={this.handleClick}
          >
            pm
          </Button>
          <Button
            className="treatment-routine-button"
            value="treatment"
            onClick={this.handleClick}
          >
            treatment
          </Button>
        </Button.Group>
        <Divider />
        <Button.Group basic vertical size="large">
          <Button
            className="skin-diary-button"
            value="diary"
            onClick={this.handleClick}
          >
            skin diary
          </Button>
          <Button
            className="shopping-list-button"
            value="list"
            onClick={this.handleClick}
          >
            shopping list
          </Button>
          <Button
            className="brands-button"
            value="brands"
            onClick={this.handleClick}
          >
            all brands
          </Button>
        </Button.Group>{" "}
        <br />
      </div>
    );
  }
}

export default DashboardContainer;
