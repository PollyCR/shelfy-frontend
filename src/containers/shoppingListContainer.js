import React, { Component } from "react";
import API from "../adapters/API";
import ShoppingListProduct from "../components/ShoppingListProduct";
import { Button } from "semantic-ui-react";

export class ShoppingListContainer extends Component {
  state = { list_products: [],
  products: [] };


  componentDidMount = () => {
    if (this.props.user) {
      API.getUser(this.props.user.id).then(data => {
        this.setState({ list_products: data.list_products });
      });
    }
  };

  handleBackClick = () => {
    this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div>
        <h1>Shopping List</h1>

        {this.props.user && this.state.list_products
          ? this.state.list_products.map(lp => (
              <ShoppingListProduct
              key = {lp.id}
                history={this.props.history}
                list_product = {lp}
                user={this.props.user}
                product={this.props.products.find(
                  product => product.id === lp.product_id
                )}
              />
            ))
          : null}
        <Button onClick={this.handleBackClick}>Go back</Button>
      </div>
    );
  }
}
export default ShoppingListContainer;
