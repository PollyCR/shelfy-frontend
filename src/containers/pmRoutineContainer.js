import React, { useState, useEffect } from "react";
import API from "../adapters/API";

const PMRoutineContainer = props => {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    API.validateUser();
    if (props.user) {
      API.getRoutine(props.user, "pm");
    }
  }, []);

  return <div>Hello</div>;
};

export default PMRoutineContainer;
