import React from 'react';
import './budget.css';
import { AuthState } from '../login/authState';
import { Button } from 'react-bootstrap';
import { BudgetObj } from './budgetObj.js';
import { useNavigate } from 'react-router-dom';


export function Budget(props) {
  const navigate = useNavigate();
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

  function renderVal(v) {
    if (v === null || typeof v === 'undefined') return '';
    if (typeof v === 'string' || typeof v === 'number' || React.isValidElement(v)) return v;
    // if it's an object, try common properties then fallback to JSON
    return v.name ?? v.item ?? v.id ?? JSON.stringify(v);
  };

  function listExpenses() {

    if (!props.budget.categories) return null;

    return props.budget.categories.flatMap((category, catIndex) =>
      (Array.isArray(category.expenses) ? category.expenses.map((expense, expIndex) => {
        const key = expense.id ? `${category.name}-${expense.id}` : `${category.name}-${expIndex}-${catIndex}`;
        return (
          <li key={key}>
            <Button className="button" onClick={() => props.handleDeleteExpense(catIndex, expIndex)}>🗑️</Button>{' '}
            {renderVal(expense.creator)} added {renderVal(expense.item)} for ${renderVal(expense.amount)} in {renderVal(category.name)}
          </li>
        );
      }) : null)
    );
  }

  function listCategories() {
    if (!props.budget || !Array.isArray(props.budget.categories)) return null;

    return props.budget.categories.map((category, index) => (
      console.log("rendering category:", category),
      <div className="budget-category" key={`category-${index}`}>
        <section>
          <h2>{renderVal(category.name)}</h2>
          <progress value={category.currentSpending} max={category.spendingLimit}></progress>
          <p>Spent: {category.getSpendingStatus()}</p>
          <Button className="button" onClick={() => handleEditCategory(category.name)}>edit</Button>
          <hr></hr>
        </section>
      </div>
    ));
  }

  function handleEditCategory(categoryName) {
    navigate('/category', { state: { categoryName: categoryName} });
  }
}
