import React, { Component} from "react";
import API from "../adapters/API";
import { Button } from "semantic-ui-react";



export class ShoppingListContainer extends Component {
    state = {products: []}
    componentDidMount = () => {
        API.validateUser().then(() => API.getProducts().then(data => this.setState({products: data})))}

    render() {
        return ( 
            <div>
    <h1>Coming soon</h1><h2>Ability to add products to list (mostly there, just needs the actual rendering goodness)</h2>
            </div>
        );
    }
}

export default ShoppingListContainer;

