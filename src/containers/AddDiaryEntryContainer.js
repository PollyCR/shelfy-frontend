import { Button, TextArea, Form } from "semantic-ui-react";
import API from "../adapters/API";
import React, { Component } from "react";

export class AddDiaryEntryContainer extends Component {
  state = { routine: null, entry: null };
  handleSubmit =() => {
    API.postEntry(this.props.user.id, this.state.routine, this.state.entry).then(() => {this.props.history.push("/diary")});
  };

  setValues = (e, data) => {
    e.persist();
    // // console.log(e)
    // console.log(data)
    this.setState({ [data.name]: data.value });
  };

  setEntry = (e, data) => {
    e.persist();
    // // console.log(e)
    // console.log(data)
    this.setState({ entry: data.value });
  };
  //
  routineOptions = [
    { id: "am", key: "Morning", text: "morning", value: "am" },
    { id: "pm", key: "Evening", text: "evening", value: "pm" },
    { id: "treatment", key: "Treatment", text: "treatment", value: "treatment" }
  ];
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <TextArea
            onChange={this.setEntry}
            placeholder="how's your skin feeling today?"
          />{" "}
          <Form.Dropdown
            name="routine"
            required
            clearable
            selection
            onChange={this.setValues}
            options={this.routineOptions}
            label="routine"
          />
          <Button type="submit">submit</Button>
        </Form>
      </div>
    );
  }
}
export default AddDiaryEntryContainer;
