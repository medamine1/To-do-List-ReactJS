import React, { useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  Form,
  Input,
  Label,
  Button,
} from 'reactstrap';
import { user } from '../utils/variables';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  /**
   * We call this function to check whether the connection parameters
   * are valid or not if they are valid, it will redirect to the task
   * list page
   */
  const onClickLogin = () => {
    if (username === user.username && password === user.password) {
      localStorage.setItem('isLogged', true);
      history.push('/table-to-do');
    }
  };

  return (
    <div className="auth-inner">
      <Form>
        <h3>Sign In</h3>
        <div className="form-group">
          <Label>Email address</Label>
          <Input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <Label>Password</Label>
          <Input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={() => onClickLogin()}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
