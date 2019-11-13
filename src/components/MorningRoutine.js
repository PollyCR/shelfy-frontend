import React, { Component } from "react";

export class MorningRoutine extends Component {
  getProducts = () => {
    return this.props.user.morning_products.map(product => (
      <p>{product.name}</p>
    ));
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
            <p>It's time for...</p>
            <div>{this.getProducts()}</div>
          </div>
        ) : (
          <h1 className="main-title">Good morning!</h1>
        )}
        {/* {this.props.user ? API.getMorningRoutineProducts(this.props.user) : null} */}
      </div>
    );
  }
}

export default MorningRoutine;
