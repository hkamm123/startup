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
import { CategoryObj } from './budget/categoryObj.js';
import { ExpenseObj } from './budget/expenseObj.js';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [budget, setBudget] = React.useState(() => {
    const raw = localStorage.getItem('budget');
    if (!raw) return new BudgetObj(userName);
    try {
      const parsed = JSON.parse(raw);
      return reviveBudget(parsed, userName);
    } catch (e) {
      console.error('Failed to parse budget from storage, creating new one', e);
      return new BudgetObj(userName);
    }
  });

  function reviveBudget(source, defaultUser) {
    const src = source || {};
    const b = new BudgetObj(src.username ?? defaultUser);
    const cats = Array.isArray(src.categories) ? src.categories : [];
    for (const c of cats) {
      const cat = new CategoryObj(c.name, c.spendingLimit ?? 0);
      // copy any simple fields the CategoryObj uses
      if (typeof c.currentSpending !== 'undefined') cat.currentSpending = c.currentSpending;
      const exps = Array.isArray(c.expenses) ? c.expenses : [];
      for (const e of exps) {
        const expense = new ExpenseObj(Number(e.amount) || 0, e.item, e.category ?? c.name, e.creator);
        cat.addExpense(expense);
      }
      b.addCategory(cat);
    }
    return b;
  }

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
        <Route path='/budget' element={<Budget 
          userName={userName} 
          authState={authState} 
          budget={budget}
          handleDeleteExpense={(catIndex, expIndex) => {
            budget.removeExpense(catIndex, expIndex);
            const newBudget = reviveBudget(budget, userName);
            setBudget(newBudget);
            localStorage.setItem('budget', JSON.stringify(newBudget));
          }}
          />} />
        <Route path='/category' element={<Category 
          userName={userName} 
          authState={authState} 
          budget={budget}
          onEditCategory={(catName, catLimit) => {
            budget.addCategory(catName, catLimit);
            setBudget(budget);
            localStorage.setItem('budget', JSON.stringify(budget));}}
          />} />
        <Route path='/expense' element={<Expense userName={userName} authState={authState} budget={budget} addExpense={
          (categoryName, expense) => {
            budget.addExpense(categoryName, expense);
            setBudget(budget);
            localStorage.setItem('budget', JSON.stringify(budget));
          }
        }/>} />
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