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
    { id: "am", key: "Morning", text: "Morning", value: "am" },
    { id: "pm", key: "Evening", text: "Evening", value: "pm" },
    { id: "treatment", key: "Treatment", text: "Treatment", value: "treatment" }
  ];
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <TextArea
            onChange={this.setEntry}
            placeholder="Enter your diary entry here "
          />{" "}
          <Form.Dropdown
            name="routine"
            required
            clearable
            selection
            onChange={this.setValues}
            options={this.routineOptions}
            label="Routine"
          />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}
export default AddDiaryEntryContainer;
