import React, { Component } from 'react';
import {Card, Button} from 'semantic-ui-react'
import API from '../adapters/API'



export class Product extends Component {




    render() {
        return ( <div>
            <Card>
            <Card.Header>{this.props.product.name}</Card.Header>
            <Card.Meta>{this.props.product.product_type}</Card.Meta>
            <Card.Content extra className = "ui two buttons">
                <Button basic color = 'green'>Add comment</Button>
                <Button onClick = {() => {this.props.handleDeleteClick(this.props.product.id)}} basic color = 'red'>Delete product</Button>
            </Card.Content>

            </Card>
        </div>

        );
    }
}

export default Product;
