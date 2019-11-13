import React, { Component } from "react";
import { Card, Button, Placeholder } from "semantic-ui-react";
import API from "../adapters/API";

export class Product extends Component {
  handleListClick = () => {
    API.addListProduct(this.props.user.id, this.props.product.id)
      .then(() => API.getUser())
      .then(this.props.history.push("/list"));
    // .then(() => {API.getRoutine()})
  };

  getIngredients = () => {
    return this.props.user.products
      .filter(product => product.id === this.props.product.id)[0]
      .active_ingredients.map(ingredient => ingredient.name)
      .join(", ");
  };

  getBrand = product => {
    if (
      this.props.brands &&
      this.props.brands.length > 0 &&
      product &&
      product.name
    ) {
      return this.props.brands.find(brand => brand.id === product.brand_id)
        .name;
    }
  };

  render() {
    return (
      <div>
        {this.props.product ? (
          <Card className="product-card">
            <Card.Content>
              <Card.Header>{this.props.product.name}</Card.Header>
              <Card.Description className="brandName">
                {this.props.product ? (
                  this.getBrand(this.props.product)
                ) : (
                  <Placeholder />
                )}
              </Card.Description>
              <Card.Description>
                {this.props.product.product_type}
              </Card.Description>
              <Card.Meta className="activeIngredients">
                {this.getIngredients()}
              </Card.Meta>
              <Card.Content extra className="ui two buttons">
                <Button basic onClick={this.handleListClick} color="green">
                  Running low!
                </Button>
                <Button
                  onClick={() => {
                    this.props.handleDeleteClick(this.props.product.id);
                  }}
                  basic
                  color="red"
                >
                  Delete product
                </Button>
              </Card.Content>
            </Card.Content>
          </Card>
        ) : (
          <Placeholder />
        )}
      </div>
    );
  }
}

export default Product;
