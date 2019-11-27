import React, { Component } from "react";
import ShoppingListProduct from "../Components/ShoppingListProduct";
import { Button, Loader } from "semantic-ui-react";

export class ShoppingListContainer extends Component {
  handleBackClick = () => {
    this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div>
        <h1 className="main-title">shopping list</h1>

        {this.props.user &&
        this.props.user.list_products &&
        this.props.user.list_products.length > 0 ? (
          this.props.user.list_products.map(lp => (
            <ShoppingListProduct
              setUserState={this.props.setUserState}
              className="product-card"
              key={lp.id}
              history={this.props.history}
              list_product={lp}
              user={this.props.user}
              product={this.props.products.find(
                product => product.id === lp.product_id
              )}
            />
          ))
        ) : (
          <>
            No products yet!
            <br />
            <Loader active />
          </>
        )}
        <Button basic color="grey" onClick={this.handleBackClick}>
          go back
        </Button>
      </div>
    );
  }
}
export default ShoppingListContainer;
