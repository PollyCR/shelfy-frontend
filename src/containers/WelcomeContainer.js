



import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export class WelcomeContainer extends Component {
    render() {
        return (
            <div>
<Link to ="/login"><Button>Log in</Button></Link>
<Link to ="/signup"><Button>Sign up</Button></Link>
</div>
        );
    }
}

export default WelcomeContainer;

