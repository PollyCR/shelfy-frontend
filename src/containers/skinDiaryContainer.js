import React, {useState, useEffect} from 'react';
import API from '../adapters/API'
import {Button, Form} from 'semantic-ui-react'

const SkinDiaryContainer = props => {
    const [diary, setDiary] = useState([]);

    useEffect(() => {
      API.validateUser();
      if (props.user) {
        API.getDiary(props.user)
      }
    }, []);

return (<h1> hello</h1>)
// diary.length > 0 ? <h3>Hello</h3> : 
// )

}

export default SkinDiaryContainer;
