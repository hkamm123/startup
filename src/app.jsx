import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Budget } from './budget/budget';
import { Category } from './category/category';
import { Expense } from './expense/expense';
import { AuthState } from './login/authState';
import { BudgetObj } from './budget/budgetObj.js';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [budget, setBudget] = React.useState(localStorage.getItem('budget') ? JSON.parse(localStorage.getItem('budget')) : new BudgetObj());

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
                setUserName(username);
              }}
            />
          }
          exact
        />
        <Route path='/budget' element={<Budget userName={userName} authState={authState} budget={budget}/>} />
        <Route path='/category' element={<Category userName={userName} authState={authState} budget={budget} />} />
        <Route path='/expense' element={<Expense userName={userName} authState={authState} />} />
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