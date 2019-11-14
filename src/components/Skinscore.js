import React, { Component } from "react";
import { Rating } from "semantic-ui-react";

export default class Skinscore extends Component {
  state = { skinscore: 0 };

  handleChange = e => this.setState({ skinscore: e.target.value });

  render() {
    const { skinscore } = this.state;

    return <Rating icon="heart" defaultRating={1} maxRating={5} />;
  }
}
