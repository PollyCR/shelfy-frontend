import React, { Component } from "react";
import API from "../adapters/API";

import AddDiaryEntryContainer from "./AddDiaryEntryContainer";

class SkinDiaryContainer extends React.Component {
  state = { diary: null };

  componentDidMount = () => {
    API.validateUser().then(
      API.getDiary(this.props.user).then(data => {
        this.setState({ diary: data });
      })
    );
  };

  

  render() {
    return (
      <div>
        {this.state && this.state.diary ? (
            // console.log("hi")
          <AddDiaryEntryContainer history = {this.props.history} user={this.props.user} />
        ) : null}
        {this.state && this.state.diary && this.state.diary.entries && this.state.diary.entries.length > 0
          ? this.state.diary.entries.map(entry => <h4 key = {entry.id}>{entry.content}</h4>)
          : null}{" "}
      </div>
    );
    // diary.length > 0 ? <h3>Hello</h3> :
    // )
  }
}

export default SkinDiaryContainer;
