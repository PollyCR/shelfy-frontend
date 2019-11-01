import React, { Component } from 'react';
import MorningRoutine from '../components/MorningRoutine';
import EveningRoutine from '../components/EveningRoutine'
import {Link} from 'react-router-dom'
import {Button, Divider, Container } from 'semantic-ui-react'
import API from '../adapters/API';

export class DashboardContainer extends Component {


    componentDidMount = () => {
        API.validateUser().then(user => {
            this.setState({ user });
          // console.log(user)
          if (user && user.errors) {
            this.props.history.push("/welcome");
          }         
        })
      }
    
    getTime = () => {
        let today = new Date()
        let time = today.getHours()
        return time
    }

    getRoutine = () => {
       let currentTime = this.getTime()
       if (currentTime >= 0 &&currentTime < 12) {
    return <MorningRoutine user = {this.props.user}/> }
       else if (currentTime >=12) {
           return <EveningRoutine user = {this.props.user}/>}
       
    }
    render() {
        return (
            <div>
<Link to="/logout"><Button>Logout</Button></Link>
<div>{this.getRoutine()}</div>
<Container className = "main-menu">
                <Button className = "am-routine-button">AM</Button><br />
                <Button className = "pm-routine-button">PM</Button><br/>
                <Button className = "treatment-routine-button">Treatment</Button><br/>
                <Divider />
                <Button className = "skin-diary-button">Skin Diary</Button><br/>
                <Button className = "shopping-list-button">Shopping List</Button><br/>
                <Button className = "brands-button">Brands</Button>
                </Container>
            </div>
        );
    }
}

export default DashboardContainer;
