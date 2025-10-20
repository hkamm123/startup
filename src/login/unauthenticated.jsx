import React from 'react';

import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <form method="get" action="/budget">
      <span>Please Log In or Create an Account</span>
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />

      <Button className="button" onClick={() => loginUser()} disabled={!userName || !password}>
        Login
      </Button>
      <Button className="button" onClick={() => createUser()} disabled={!userName || !password}>
        Create
      </Button>
    </form>
  );
}