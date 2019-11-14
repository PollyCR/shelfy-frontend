import React from "react";
import { Loader } from "semantic-ui-react";

const EveningRoutine = props => {
  const getProducts = () => {
    return props.user.evening_products.map(product => (
      <ul key={product.id} className="product-listing">
        {product.name}
      </ul>
    ));
  };
  return (
    <div>
      {props.user && props.user.display_name ? (
        <div>
          <h1 className="main-title">
            Your next routine will be this evening,{" "}
            {props.user.display_name.charAt(0).toUpperCase() +
              props.user.display_name.slice(1)}
            !
          </h1>
          <div>{getProducts()}</div>
        </div>
      ) : (
        <Loader active />
      )}
      {/* {this.props.user ? API.getMorningRoutineProducts(this.props.user) : null} */}
    </div>
  );
};

export default EveningRoutine;
