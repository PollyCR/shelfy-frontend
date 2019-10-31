import React, { Component } from 'react';
import API from '../adapters/API'

export class EveningRoutine extends Component {


    getRoutine = () => {
        // API.getEveningRoutineProducts(this.props.user)
    }


    render() {
        return (
            <div>
  {/* {this.props.user !=="undefined" ? <h1 className="main-title">Good evening, {this.props.user.display_name.charAt(0).toUpperCase()+ this.props.user.display_name.slice(1)}!</h1> : <h1 className="main-title">Good evening!</h1>} */}
  Coming up, your evening routine...
  {/* {this.props.user ? this.getRoutine(this.props.user) : null} */}
            </div>
        );
    }
}

export default EveningRoutine
