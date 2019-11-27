import React, { Component } from "react";
import API from "./adapters/API";
import { Button, Loader, Container } from "semantic-ui-react";
import ProductComponent from "./Product";

export class pmRoutineContainer extends Component {
  state = {
    user: null,
    products: [],
    routine: "pm"
  };
  componentDidMount = () => {
    this.getRoutine();
  };

  handleDeleteClick = id => {
    API.deleteRoutineProduct(id).then(() => this.props.setUserState());
  };

  getRoutine = () => {
    if (this.props.user) {
      API.getUser(this.props.user.id).then(data => {
        // console.log(data);
        this.setState({ user: data, products: data.evening_products });
      });
    }
  };

  handleBackClick = () => {
    this.props.setUserState().then(() => this.props.history.push("/dashboard"));
  };

  handleAddProductClick = () => {
    this.props.history.push("/add");
  };

  getProducts = () => {
    if (this.state.user && !this.state.products) {
      return <Loader active />;
    } else if (
      this.state.user &&
      this.state.products &&
      this.state.products.length > 0
    ) {
      return this.state.products.map(product => (
        <ProductComponent
          className="productCard"
          setProducts={this.props.setProducts}
          handleDeleteClick={this.handleDeleteClick}
          key={product.id}
          product={product}
          user={this.state.user}
          history={this.props.history}
          brands={this.props.brands}
          routine={this.state.routine}
        />
      ));
    } else {
      return (
        <div className="centered">
          There are no products in your routine yet!
        </div>
      );
    }
  };

  render() {
    return (
      <Container>
        {this.getProducts()}
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

export default pmRoutineContainer;
