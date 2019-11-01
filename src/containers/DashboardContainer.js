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
                <Button className = "am-routine-button" onClick = {this.handleAmClick}>AM</Button><br />
                <Button className = "pm-routine-button" onClick = {this.handlePmClick}>PM</Button><br/>
                <Button className = "treatment-routine-button" onClick = {this.handleTreatmentClick}>Treatment</Button><br/>
                <Divider />
                <Button className = "skin-diary-button" onClick = {this.handleDiaryClick}>Skin Diary</Button><br/>
                <Button className = "shopping-list-button" onClick = {this.handleListClick}>Shopping List</Button><br/>
                <Button className = "brands-button" onClick = {this.handleBrandsClick}>Brands</Button>
                </Container>
            </div>
        );
    }
}

export default DashboardContainer;
