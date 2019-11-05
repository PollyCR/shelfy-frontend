import React, { Component } from "react";
import API from "../adapters/API";
import { Form, Button, Placeholder } from "semantic-ui-react";

export class AddBrandProductContainer extends Component {
  state = { brand: null };

  componentDidMount = () => {
    if (this.props.selectedProduct) {
      API.getBrands().then(brands => {
        if (this.props.selectedProduct !== undefined) {
          this.setState({
            brand: brands.find(
              brand => brand.id === this.props.selectedProduct.brand_id
            )
          });
        }
      });
    } else {
      this.props.history.push("/dashboard");
    }
  };

  handleSubmit = event => {
    event.persist();
    API.addProduct({ ...this.state, id: this.props.user.id });
    // .then(() => {
    //   this.props.history.push(`/${this.state.routine}`);
    // });
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

  setRoutine = (e, value) => {
    this.setState({ routine: value });
  };
  render() {
    return (
      <div>
        <h1>Add {this.props.selectedProduct.name} to routine</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            onChange={this.setActiveIngredients}
            name="active_ingredients"
            label="Active ingredient(s)"
          />
          <Form.Dropdown
            name="routine"
            required
            clearable
            selection
            onChange={this.setRoutine}
            options={this.routineOptions}
            label="Routine"
          />
          <Button type="submit">Add product</Button>
        </Form>
      </div>
    );
  }
}

export default AddBrandProductContainer;
