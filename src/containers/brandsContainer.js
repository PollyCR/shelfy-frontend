import React, { Component } from "react";
import API from "../adapters/API";

export class brandsContainer extends Component {
state = {
    brands: []
}
componentDidMount() {
    this.brands()
}
    brands = () => {
        return API.getBrands().then(resp => this.setState({brands: resp}))
    }

    handleClick = e => 
    {console.log(e)}

  render() {
    return <div>{this.state.brands.map(brand => <ul onClick = {this.handleClick}>{brand.name}</ul>)}</div>;
  }
}

export default brandsContainer;
