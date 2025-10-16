import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();
  const [userName, setUsername] = React.useState(props.userName);

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <h2>{userName}</h2>
      <Button onClick={() => navigate('/budget')}>
        View Budget
      </Button>
      <Button onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}