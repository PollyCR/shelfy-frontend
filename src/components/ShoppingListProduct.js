import React, { Component } from 'react';
import {Card, Button} from 'semantic-ui-react'
import API from '../adapters/API';

export class ShoppingListProduct extends Component {

handleDeleteClick = () => {
    API.deleteListProduct(this.props.list_product.id).then(() => {this.props.history.push("/list")})}

    render() {
        return (
this.props.product)? 
                <Card key = {this.props.product.id}><Card.Header>{this.props.product.name}</Card.Header>
          <Card.Meta>{this.props.product.product_type}</Card.Meta>

        <Button key = {this.props.product.id} onClick = {() => this.handleDeleteClick()}>Purchased</Button>
          </Card>
         : null
        ;
    }
}

export default ShoppingListProduct;
