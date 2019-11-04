import React from 'react';
import API from '../adapters/API'
import {Placeholder} from 'semantic-ui-react'


const EveningRoutine = props => {

    const getProducts = () => {

        return <h1>Good evening, {props.user.display_name}!</h1>
    }

    return (
        <div>
            {props.user && props.user.display_name ?  getProducts() : <Placeholder /> }
        </div>
    );
}

export default EveningRoutine;

