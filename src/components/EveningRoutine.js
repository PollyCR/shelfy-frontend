import React from 'react';


const EveningRoutine = props => {


        return (
          <div>
            {props.user && props.user.display_name ? (
              <h1 className="main-title">
                Your next routine will be this evening,{" "}
                {props.user.display_name.charAt(0).toUpperCase() +
                  props.user.display_name.slice(1)}!
              </h1>
            ) : (
              <h1 className="main-title">Your next routine will be this evening</h1>
            )}
            {/* {this.props.user ? API.getMorningRoutineProducts(this.props.user) : null} */}
          </div>
        )
            }

export default EveningRoutine;

