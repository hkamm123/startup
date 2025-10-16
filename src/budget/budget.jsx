import React from 'react';
import './budget.css';
import { AuthState } from '../login/authState';
import { Button } from 'react-bootstrap';
import { BudgetObj } from './budgetObj.js';


export function Budget(props) {

  if (props.authState !== AuthState.Authenticated) {
    return (
      <main>
        <h1>Access Denied.</h1>
      </main>)
  } else {
    return (
      <main>
        <h1>My Budget</h1>
        <h2>Welcome, {props.userName}!</h2>

        <div className="budget-content">
          <div className="recent-transactions">
            <section>
              <h3>Recent Transactions</h3>
              <ul>
                {listExpenses()}
              </ul>
            </section>
          </div>
            
          <div className="budget-category">
            <section>
              <h2>Groceries</h2>
              <progress value="37" max="100"></progress>
              <p>Spent: $37/$100</p>
              <a href="/category">edit</a>
              <hr></hr>
            </section>
          </div>

          <div className="budget-category">
            <section>
              <h2>Gas</h2>
              <progress value="20" max="75"></progress>
              <p>Spent: $20/$75</p>
              <a href="/category">edit</a>
              <hr></hr>
            </section>
          </div>
        </div>

        <a href="/category">Add a Category</a>
        <a target="_blank" href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
      </main>
    );
  }

  function listExpenses() {
    var elements = [];
    for (let category of props.budget.categories) {
      for (let expense of category.expenses) {
        elements.push(<li>
          <Button onClick={category.removeExpense(expense)}>🗑️</Button>
          {expense.creator} added {expense.item} for ${expense.amount} in {category.name}
          </li>)
      }
    }
    return elements;
  }
}
