import React from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
  }

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    console.log('r u in signup');
  }

  render() {
    return (
      <div className="App">
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default SignUp;
