import React, { useState, useEffect } from "react";
import API from "../adapters/API";

const AMRoutineContainer = props => {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    API.validateUser();
    if (props.user) {
      API.getRoutine(props.user, "am");
    }
  }, []);

  return <div>{routine}</div>;
};

export default AMRoutineContainer;
