import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();
  const {username, onLogout} = props;

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <Button onClick={() => navigate('/budget')}>
        View Budget
      </Button>
      <Button onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );

  console.log("username " + props.username);
}