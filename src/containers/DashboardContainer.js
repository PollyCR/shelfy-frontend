import React, { Component } from 'react';
import MorningRoutine from '../components/MorningRoutine';
import EveningRoutine from '../components/EveningRoutine'
import {Button, Divider, } from 'semantic-ui-react'
import API from '../adapters/API';
import {Link} from 'react-router-dom'

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

    handleAmClick = e => {
        e.persist()
        e.preventDefault()
this.props.history.push('/am')
    }

    handleDiaryClick = e => {
        e.persist()
        e.preventDefault()
this.props.history.push('/diary')
    }

    handleListClick = e => {
        e.persist()
        e.preventDefault()
this.props.history.push('/list')
    }

    handleBrandsClick = e => {
        e.persist()
        e.preventDefault()
this.props.history.push('/brands')
    }

    handlePmClick = e => {
        e.persist()
        e.preventDefault()
this.props.history.push('/pm')
    }

    handleTreatmentClick = e => {
        e.persist()
        e.preventDefault()
this.props.history.push('/treatment')
    }

    getRoutine = () => {
       let currentTime = this.getTime()
       if (currentTime >= 0 && currentTime < 12) {
    return <MorningRoutine user = {this.props.user}/> }
       else if (currentTime >=12) {
           return <EveningRoutine user = {this.props.user}/>}
       
    }
    render() {
        return (
            <div>
      <Link to="/logout"><Button basic className = "log-out-button">Logout</Button></Link>
      <Divider />
<div>{this.getRoutine()}</div><Button.Group basic vertical size= "large">
                <Button className = "am-routine-button" onClick = {this.handleAmClick}>AM</Button>
                <Button className = "pm-routine-button" onClick = {this.handlePmClick}>PM</Button>
                <Button className = "treatment-routine-button" onClick = {this.handleTreatmentClick}>Treatment</Button>
                </Button.Group>
                <Divider />
                <Button.Group basic vertical size= "large">
                <Button className = "skin-diary-button" onClick = {this.handleDiaryClick}>Skin Diary</Button>
                <Button className = "shopping-list-button" onClick = {this.handleListClick}>Shopping List</Button>
                <Button className = "brands-button" onClick = {this.handleBrandsClick}>Brands</Button>
                </Button.Group>
                </div>
        );
    }
}

export default DashboardContainer;
