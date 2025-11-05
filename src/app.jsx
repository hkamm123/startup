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
    new BudgetObj(userName);
  })

  async function fetchBudget() {
    const response = await fetch('/api/budget', {
      method: 'get',
      credentials: 'include'
    })
    if (response.status !== 200) {
      setBudget(new BudgetObj(userName)); // temporary budget if the user is not logged in
      return new BudgetObj(userName);
    }
    const body = await response.json();
    const revived = reviveBudget(body, userName);
    setBudget(revived);
    return revived;
  }

  React.useEffect(() => {
    if (authState === AuthState.Authenticated && userName) {
      fetchBudget();
    } else {
      setBudget(new BudgetObj(userName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, userName]);
    
  React.useEffect(() => { // temporary placeholder to simulate websocket communication
    const id = setInterval(() => {
      let catIndex = budget.categories.findIndex(c => c.name === 'Misc');
      if (catIndex !== -1 && budget.categories[catIndex].expenses.length === 0) {
        addExpense('Misc', new ExpenseObj(5, 'stuff', 'Misc', 'otherUser'));
      }
      setTimeout(() => {
        let catIndex = budget.categories.findIndex(c => c.name === 'Misc');
        if (catIndex !== -1) {
          let expIndex = budget.categories[catIndex].expenses.findIndex(e => e.item === 'stuff');
          if (expIndex !== -1) {
            deleteExpense(catIndex, expIndex);
          }
        }
      }, 3000);
    }, 3000);
    return () => clearInterval(id);
  }, [budget]);
  
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
      b.categories.push(cat);
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
          handleDeleteExpense={deleteExpense}
          addExpense={addExpense}
          />} />
        <Route path='/category' element={<Category 
          userName={userName} 
          authState={authState} 
          budget={budget}
          onEditCategory={async (catName, catLimit) => {
            const next = reviveBudget(JSON.parse(JSON.stringify(budget)), userName);
            next.addCategory(catName, catLimit);
            const res = await fetch('/api/budget', {
              method: 'PUT',
              credentials: 'include',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(next)
            });
            if (res.status !== 200) {
              console.error("failed to save updated budget");
              return;
            }
            const saved = await res.json();
            setBudget(reviveBudget(saved, userName));
          }}
          />} />
        <Route path='/expense' element={<Expense 
          userName={userName} 
          authState={authState} 
          budget={budget} 
          addExpense={addExpense}
        />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer>
          <p>Created by Hyrum Kammerman</p>
          <a href="https://github.com/hkamm123/startup">GitHub</a>
      </footer>
  </BrowserRouter>);

  function addExpense(categoryName, expense) {
    const plain = JSON.parse(JSON.stringify(budget));
    const newBudget = reviveBudget(plain, userName);
    newBudget.addExpense(categoryName, expense);
    setBudget(newBudget);
    localStorage.setItem('budget', JSON.stringify(newBudget));
  }

  function deleteExpense(catIndex, expIndex) {
    budget.removeExpense(catIndex, expIndex);
    const newBudget = reviveBudget(budget, userName);
    setBudget(newBudget);
    localStorage.setItem('budget', JSON.stringify(newBudget));
  }
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Page not found.</main>;
}