import React, {  Component } from "react";
import API from "../adapters/API";
import { Button } from "semantic-ui-react";
import ProductComponent from '../components/Product'

export class pmRoutineContainer extends Component {

  state = {
    routine: null, 
    products: []
  }

  componentDidMount = () => {
    API.validateUser().then(() => {
      if (this.props.user) {
        API.getProducts().then(data => {
          this.setState({ products: data, routine: this.props.user.routines.find(routine => routine.routine_type === "pm")}, this.matchProducts)
        
        });
  }})}

   matchProducts = () => {
    return this.state.products.filter(product => product.routine_products.find(p => p.routine_id ===this.state.routine.id))
  };

  handleAddProductClick = () => {
    this.props.history.push("/add");
  };

  render() {
    return (
      <div>
        {this.state.products ? (
          this.matchProducts().map(product =>
            product.name && product.name.length > 0 ? (
              <ProductComponent key = {product.id} product={product} />
            ) : null
          )
        ) : (
          <h5>there are no products in your routine yet!</h5>
        )}
        <Button onClick={this.handleAddProductClick}>Add product</Button>
      </div>
    );
  }
}

export default pmRoutineContainer;