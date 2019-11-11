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

  getRoutineType = entry => {
    if (entry) {
    if (entry.routine_type === "am") {
      return "Morning";
    } else if (entry.routine_type === "pm") {
      return "Evening";
    } else if (entry.routine_type === "treatment") {
      return "Treatment";
    }
  }
  };

  getEntryTime = entry => {
    let entryTime = entry.created_at.split("T")[0].split("-")
    return `${entryTime[2]}/${entryTime[1]}/${entryTime[0]}`
  }

  render() {
    return (
      <div>
        {this.state && this.state.diary ? (
          // console.log("hi")
          <AddDiaryEntryContainer
            history={this.props.history}
            user={this.props.user}
          />
        ) : (
          <Placeholder />
        )}
        {this.state &&
        this.state.diary &&
        this.state.diary.entries &&
        this.state.diary.entries.length > 0
          ? this.state.diary.entries.map(entry => (
              <div key={entry.id}>
                <p>{this.getRoutineType(entry)}</p>
                <p>{this.getEntryTime(entry)}</p>
                <h4 className = "diary-entry">{entry.content}</h4>
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
