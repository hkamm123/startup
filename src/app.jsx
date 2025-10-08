import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Budget } from './budget/budget';
import { Category } from './category/category';
import { Expense } from './expense/expense';

export default function App() {
  return (
  <BrowserRouter>
      <header>
          <h1>NoNonCents</h1>
          <nav>
              <menu>
              <li><NavLink className="nav-link" to="/">Home</NavLink></li>
              <li><NavLink className="nav-link" to="budget">My Budget</NavLink></li>
              <li><NavLink className="nav-link" to="expense">Add Expense</NavLink></li>
              </menu>
          </nav>
      </header>

      <Routes>
        <Route path='/' element={<Login />} exact />
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