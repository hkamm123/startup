import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();
  const [userName, setUsername] = React.useState(props.userName);

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div>
      <h2>{userName}</h2>
      <Button className="button" onClick={() => navigate('/budget')}>
        View Budget
      </Button>
      <Button className="button" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}