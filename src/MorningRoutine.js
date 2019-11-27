import React, { Component } from "react";
import { Loader } from "semantic-ui-react";
import API from "./adapters/API";

export class MorningRoutine extends Component {
  getProducts = () => {
    return this.props.user.morning_products.map(product => (
      <ul key={product.id} className="product-listing">
        {product.name}
      </ul>
    ));
  };

  componentDidMount = () => {
    if (this.props.user && this.props.user.id) {
      API.getUser(this.props.user.id);
    }
  };
  render() {
    return (
      <div>
        {this.props.user && this.props.user.display_name ? (
          <div>
            <h1 className="main-title">
              Good morning,{" "}
              {this.props.user.display_name.charAt(0).toUpperCase() +
                this.props.user.display_name.slice(1)}
              !
            </h1>
            <p>It's time for your morning routine.</p>
            <div>{this.getProducts()}</div>
          </div>
        ) : (
          <Loader active />
        )}
        {/* {this.props.user ? API.getMorningRoutineProducts(this.props.user) : null} */}
      </div>
    );
  }
}

export default MorningRoutine;
