import React, { Component } from "react";
import API from "../adapters/API";
import { Form, Button } from "semantic-ui-react";

export class AddBrandProductContainer extends Component {
  state = { 
      product: null,
      brand_id: null };

  componentDidMount = () => {
    if (this.props.selectedProduct) {
      API.getBrands().then(brands => {
        if (this.props.selectedProduct) {
          this.setState({
            brand_id: brands.find(
              brand => brand.id === this.props.selectedProduct.brand_id
            ).id,
            product: this.props.selectedProduct
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


  setRoutine = (e, value) => {
    this.setState({ routine: value.value });
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
