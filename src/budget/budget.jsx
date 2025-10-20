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
            
          {listCategories()}
        </div>

        <a href="/category">Add a Category</a>
        <a target="_blank" href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
      </main>
    );
  }

  function listExpenses() {
    if (!props.budget || !Array.isArray(props.budget.categories)) return null;

    return props.budget.categories.flatMap((category, catIndex) =>
      (Array.isArray(category.expenses) ? category.expenses.map((expense, expIndex) => {
        const key = expense.id ? `${category.name}-${expense.id}` : `${category.name}-${expIndex}-${catIndex}`;
        return (
          <li key={key}>
            <Button onClick={() => category.removeExpense(expense)}>🗑️</Button>{' '}
            {expense.creator} added {expense.item} for ${expense.amount} in {category.name}
          </li>
        );
      }) : [])
    );
  }

  function listCategories() {
    if (!props.budget || !Array.isArray(props.budget.categories)) return null;

    return props.budget.categories.map((category, index) => (
      <div className="budget-category" key={`category-${index}`}>
        <section>
          <h2>{category.name}</h2>
          <progress value={category.currentSpending} max={category.spendingLimit}></progress>
          <p>Spent: {category.getSpendingStatus()}</p>
          <a href="/category">edit</a>
          <hr></hr>
        </section>
      </div>
    ));
  }
}
