import React, { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Loader, Dimmer } from 'semantic-ui-react';

const ConfirmAcct = props => {
  const [isLoading, setIsLoading] = useState(true)
  let { hash } = useParams();
  axios
    .post("https://stage-homerun-be.herokuapp.com/auth/confirm", hash)
    .then(res => {
      setIsLoading(false)
      props.history.push("/signin/email");
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });

  return(
    <div>
      {isLoading ? (
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer> ) : (null)
      }
    </div>
  )
}

export default ConfirmAcct;