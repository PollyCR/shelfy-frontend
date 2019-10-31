import React, { Component } from 'react';
import API from '../adapters/API'

export class MorningRoutine extends Component {



    getName = () => {
        let name = this.props.user.display_name.charAt(0).toUpperCase()+ this.props.user.display_name.slice(1)
        return `Good morning, ${name}!`

    }



    render() {
        return (
            <div>
          {this.props.user ? <h1 className="main-title">Good morning, {this.props.user.display_name.charAt(0).toUpperCase()+ this.props.user.display_name.slice(1)}</h1> :<h1 className="main-title">Good morning!</h1>}
          {this.props.user ? this.props.getMorningRoutine(this.props.user) : null}
            </div>
        );
    }
}

export default MorningRoutine
