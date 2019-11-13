import React, { Component } from "react";
import MorningRoutine from "../components/MorningRoutine";
import EveningRoutine from "../components/EveningRoutine";
import { Button, Divider, } from "semantic-ui-react";
import API from "../adapters/API";

export class DashboardContainer extends Component {
  state = {
    routine: null
  };

  componentDidMount = () => {
    API.validateUser().then(user => {
      this.setState({ user });
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

  handleAmClick = e => {
    e.persist();
    e.preventDefault();
    console.log(e);
    // this.props.history.push(`/${);
  };

  handleDiaryClick = e => {
    e.persist();
    e.preventDefault();
    this.props.history.push("/diary");
  };

  handleListClick = e => {
    e.persist();
    e.preventDefault();
    this.props.history.push("/list");
  };

  handleBrandsClick = e => {
    e.persist();
    e.preventDefault();
    this.props.history.push("/brands");
  };

  handlePmClick = e => {
    e.persist();
    e.preventDefault();
    this.props.history.push("/pm");
  };

  handleTreatmentClick = e => {
    e.persist();
    e.preventDefault();
    this.props.history.push("/treatment");
  };

  getRoutine = () => {
    let currentTime = this.getTime();
    if (currentTime >= 22 || currentTime < 10) {
      return <MorningRoutine user={this.props.user} />;
    } else {
      return <EveningRoutine user={this.props.user} />;
    }
  };
  render() {
    return (
      <div>
        <Divider />
        <div>{this.getRoutine()}</div>
        <Button.Group basic vertical size="large">
          <Button
            className="am-routine-button"
            value="am"
            onClick={this.handleAmClick}
          >
            am
          </Button>
          <Button
            className="pm-routine-button"
            value="pm"
            onClick={this.handlePmClick}
          >
            pm
          </Button>
          <Button
            className="treatment-routine-button"
            value="treatment"
            onClick={this.handleTreatmentClick}
          >
            treatment
          </Button>
        </Button.Group>
        <Divider />
        <Button.Group basic vertical size="large">
          <Button className="skin-diary-button" onClick={this.handleDiaryClick}>
            skin diary
          </Button>
          <Button
            className="shopping-list-button"
            onClick={this.handleListClick}
          >
            shopping list
          </Button>
          <Button className="brands-button" onClick={this.handleBrandsClick}>
            all brands
          </Button>
        </Button.Group>{" "}
        <br />
      </div>
    );
  }
}

export default DashboardContainer;
