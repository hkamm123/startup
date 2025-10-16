import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Budget } from './budget/budget';
import { Category } from './category/category';
import { Expense } from './expense/expense';
import { AuthState } from './login/authState';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
  <BrowserRouter>
      <header>
          <h1>NoNonCents</h1>
          <nav>
              <menu>
              <li><NavLink className="nav-link" to="/">Home</NavLink></li>
              { authState === AuthState.Authenticated &&
              <li><NavLink className="nav-link" to="budget">My Budget</NavLink></li>
              }
              { authState === AuthState.Authenticated &&
              <li><NavLink className="nav-link" to="expense">Add Expense</NavLink></li>
              }
              </menu>
          </nav>
      </header>

      <Routes>
        <Route
          path='/'
          element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(authState, username) => {
                setAuthState(authState);
                localStorage.setItem('authState', authState);
                setUserName(userName);
              }}
            />
          }
          exact
        />
        <Route path='/budget' element={<Budget />} />
        <Route path='/category' element={<Category />} />
        <Route path='/expense' element={<Expense />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer>
          <p>Created by Hyrum Kammerman</p>
          <a href="https://github.com/hkamm123/startup">GitHub</a>
      </footer>
  </BrowserRouter>);
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Page not found.</main>;
}