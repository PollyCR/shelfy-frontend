import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import {Button} from 'semantic-ui-react'


const PMRoutineContainer = props => {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    API.validateUser();
    if (props.user) {
      API.getRoutine(props.user, "pm");
    }
  }, []);

  const handleAddProductClick = () => {
    props.history.push("/add");
  };

  if (routine.length === 0) {return <div>You have no products in your routine yet!<br /> <Button onClick={handleAddProductClick}>Add product</Button></div>}

};

export default PMRoutineContainer;
