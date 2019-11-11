import React, { Component } from "react";
import API from "../adapters/API";
import { Button } from "semantic-ui-react";
import ProductComponent from "../components/Product";

export class treatmentRoutineContainer extends Component {
  state = {
    user: null,
    products: []
  };
  componentDidMount = () => {
    this.getRoutine();
  };

  handleDeleteClick = id => {
    API.deleteRoutineProduct(id).then(() => this.getRoutine());
  };

  getRoutine = () => {
    if (this.props.user) {
    API.getUser(this.props.user.id).then(data => {
      // console.log(data);
          this.setState({ user: data, products: data.treatment_products });
    });}
  };


  handleBackClick = () => {
    this.props.history.push("/dashboard");
  };

  handleAddProductClick = () => {
    this.props.history.push("/add");
  };

  render() {
    return (
      <div>
        {this.state.user && this.state.products.length > 0 ? (
          this.state.products.map(product => (
              <ProductComponent
                handleDeleteClick={this.handleDeleteClick}
                key={product.id}
                product={product}
                user = {this.state.user}
                history = {this.props.history}
              />
          ))
        ) : (
          <div>There are no products in your routine yet!</div>
        )}
        <Button onClick={this.handleAddProductClick}>Add product</Button>
        <br /> <Button onClick={this.handleBackClick}>Go back</Button>
      </div>
    );
  
  }
}

export default treatmentRoutineContainer;