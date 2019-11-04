import React, {useState, useEffect} from 'react';
import API from '../adapters/API'
import {Button} from 'semantic-ui-react'

const SkinDiaryContainer = props => {
    const [diary, setDiary] = useState([]);

    useEffect(() => {
      API.validateUser();
      if (props.user) {
        API.getDiary(props.user)
      }
    }, []);

            if (diary.length === 0) {return <div>You have no entries in your diary yet!<br /> <Button>Add entry</Button></div>}

}

export default SkinDiaryContainer;
