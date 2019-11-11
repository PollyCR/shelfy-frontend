import React, { Component } from "react";
import API from "../adapters/API";
import { Button, Placeholder } from "semantic-ui-react";

import AddDiaryEntryContainer from "./AddDiaryEntryContainer";

class SkinDiaryContainer extends Component {
  state = { diary: null };

  componentDidMount = () => {
    API.validateUser().then(() => {
      API.getDiary(this.props.user).then(data => {
        this.setState({ diary: data });
      });
    });
  };

  handleDeleteClick = e => {
    e.persist();
    API.deleteEntry(e.target.id).then(() => this.props.history.push("/diary"));
  };

  handleBackClick = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        {this.state && this.state.diary ? (
          // console.log("hi")
          <AddDiaryEntryContainer
            history={this.props.history}
            user={this.props.user}
          />
        ) : <Placeholder />}
        {this.state &&
        this.state.diary &&
        this.state.diary.entries &&
        this.state.diary.entries.length > 0
          ? this.state.diary.entries.map(entry => (
              <div key={entry.id}>
                <h4>{entry.content}</h4>
                <Button
                  id={entry.id}
                  onClick={this.handleDeleteClick}
                  basic
                  color="red"
                >
                  Delete entry!
                </Button>
              </div>
            ))
          : null}{" "}
          <br /> <Button onClick={this.handleBackClick}>Go back</Button>
      </div>
    );
    // diary.length > 0 ? <h3>Hello</h3> :
    // )
  }
}

export default SkinDiaryContainer;
