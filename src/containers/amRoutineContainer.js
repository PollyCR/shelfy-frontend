import React, { Component } from "react";
import API from "../adapters/API";
import { Button, Card, Container } from "semantic-ui-react";
import ProductComponent from "../components/Product";

export class amRoutineContainer extends Component {
  state = {
    user: null,
    products: [],
    routine: "am"
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
        this.setState({ user: data, products: data.morning_products });
      });
    }
  };

  handleBackClick = () => {
    this.props.history.push("/dashboard");
  };

  handleAddProductClick = () => {
    this.props.history.push("/add");
  };

  render() {
    return (
      <Container>
        {this.state.user &&
        this.state.products &&
        this.state.products.length > 0 ? (
          this.state.products.map(product => (
            <ProductComponent
              className="productCard"
              handleDeleteClick={this.handleDeleteClick}
              key={product.id}
              product={product}
              user={this.state.user}
              history={this.props.history}
              brands={this.props.brands}
              routine={this.state.routine}
            />
          ))
        ) : (
          <div className="centered">
            There are no products in your routine yet!
          </div>
        )}
        <Button.Group basic vertical>
          <Button onClick={() => this.handleAddProductClick()}>
            add product
          </Button>
          <Button onClick={() => this.handleBackClick()}>go back</Button>
        </Button.Group>
      </Container>
    );
  }
}

export default amRoutineContainer;
