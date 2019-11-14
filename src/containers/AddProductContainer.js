import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import API from "../adapters/API";

export class AddProductContainer extends Component {
  state = {
    routine: null,
    product_type: null,
    product_name: null,
    brand: null,
    active_ingredients: null
  };

  handleSubmit = event => {
    event.persist();
    API.addProduct({ ...this.state, id: this.props.user.id }).then(() =>
      this.props.history.push(`/${this.state.routine}`)
    );

    // API.getRoutine(this.props.user, this.state.routine);
  };

  routineOptions = [
    { id: "am", key: "Morning", text: "Morning", value: "am" },
    { id: "pm", key: "Evening", text: "Evening", value: "pm" },
    { id: "treatment", key: "Treatment", text: "Treatment", value: "treatment" }
  ];

  setValues = (e, data) => {
    e.persist();
    // // console.log(e)
    // console.log(data)
    this.setState({ [data.name]: data.value });
  };

  setProductType = (e, value) => {
    this.setState({ product_type: value });
  };

  productTypeOptions = [
    { key: "Cleanser", text: "Cleanser", value: "Cleanser" },
    { key: "Toner", text: "Toner", value: "Toner" },
    { key: "Moisturiser", text: "Moisturiser", value: "Moisturiser" },
    { key: "Serum", text: "Serum", value: "Serum" },
    { key: "Oil", text: "Oil", value: "Oil" },
    { key: "Eye cream", text: "Eye cream", value: "Eye cream" },
    { key: "Lip treatment", text: "Lip treatment", value: "Lip treatment" },
    { key: "SPF", text: "SPF", value: "SPF" },
    { key: "Mask", text: "Mask", value: "Mask" },
    { key: "Peel", text: "Peel", value: "Peel" },
    {
      key: "Other",
      text: "Other",
      value: "Other"
    }
  ];
  render() {
    return (
      <div>
        <h1>Add a Product...</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            onChange={this.setValues}
            name="product_name"
            label="Name"
          />
          <Form.Input
            required
            onChange={this.setValues}
            name="brand"
            label="Brand"
          />
          <Form.Dropdown
            name="product_type"
            required
            clearable
            selection
            search
            onChange={this.setValues}
            options={this.productTypeOptions}
            label="Product type"
          />
          <Form.Input
            required
            onChange={this.setValues}
            name="active_ingredients"
            label="Active ingredient(s)"
          />
          <Form.Dropdown
            name="routine"
            required
            clearable
            selection
            search
            onChange={this.setValues}
            options={this.routineOptions}
            label="Routine"
          />
          <Button basic type="submit">
            add product
          </Button>
          <Button
            basic
            color="grey"
            onClick={() => this.props.history.goBack()}
          >
            go back
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddProductContainer;
