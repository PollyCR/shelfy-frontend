import React from "react";

const EveningRoutine = props => {
  const getProducts = () => {
    return props.user.evening_products.map(product => (
      <p key={product.id}>{product.name}</p>
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
        <h1 className="main-title">Your next routine will be this evening</h1>
      )}
      {/* {this.props.user ? API.getMorningRoutineProducts(this.props.user) : null} */}
    </div>
  );
};

export default EveningRoutine;
