import React, { Component } from "react";
import API from "../adapters/API";
import { Button, Loader, Accordion } from "semantic-ui-react";
import AddDiaryEntryContainer from "./AddDiaryEntryContainer";

class SkinDiaryContainer extends Component {
  state = {
    activeIndex: 0
  };
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

  handleClick = (e, id) => {
    this.state.activeIndex !== id
      ? this.setState({ activeIndex: id })
      : this.setState({ activeIndex: 0 });
  };

  getEntryTime = entry => {
    let entryTime = entry.created_at.split("T")[0].split("-");
    return `${entryTime[2]}/${entryTime[1]}/${entryTime[0]}`;
  };

  render() {
    return (
      <div>
        {this.state && this.state.diary ? (
          <AddDiaryEntryContainer
            history={this.props.history}
            user={this.props.user}
          />
        ) : (
          <Loader active />
        )}
        <Accordion styled>
          {this.state &&
          this.state.diary &&
          this.state.diary.entries &&
          this.state.diary.entries.length > 0
            ? this.state.diary.entries.map(entry => (
                <>
                  <Accordion.Title
                    key={entry.id}
                    className="diary-info"
                    active={this.state.activeIndex === entry.id}
                    onClick={e => {
                      this.handleClick(e, entry.id);
                    }}
                  >
                    {this.getEntryTime(entry)}/{this.getRoutineType(entry)}
                  </Accordion.Title>
                  <Accordion.Content
                    active={this.state.activeIndex === entry.id}
                  >
                    <p className="diary-entry">{entry.content}</p>
                    <Button
                      id={entry.id}
                      onClick={this.handleDeleteClick}
                      basic
                      color="red"
                    >
                      Delete entry!
                    </Button>
                  </Accordion.Content>
                </>
              ))
            : "No entries yet!"}
        </Accordion>
        <br />{" "}
        <Button basic onClick={this.handleBackClick}>
          go back
        </Button>
      </div>
    );
    // diary.length > 0 ? <h3>Hello</h3> :
    // )
  }
}

export default SkinDiaryContainer;
