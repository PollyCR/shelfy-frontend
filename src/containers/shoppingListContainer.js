import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import { Button } from "semantic-ui-react";

const ShoppingListContainer = props => {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.validateUser();
    if (props.user) {
      API.getList(props.user);
    }
  }, []);

  const handleBackClick = () => {
    props.history.push("/dashboard");
  };

  if (list.length === 0) {
    return (
      <div>
        You have no products on your list yet!
        <br /> <Button onClick={handleBackClick}>Go back</Button>
      </div>
    );
  }
};

export default ShoppingListContainer;
