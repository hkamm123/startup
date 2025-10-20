import React from 'react';
import {AuthState} from '../login/authState';
import { ExpenseObj } from '../budget/expenseObj';
import { useNavigate } from 'react-router-dom';

export function Expense(props) {
  const [amount, updateAmount] = React.useState(props.amount || 0);
  const [item, updateItem] = React.useState(props.item || 'item');
  const [categoryName, updateCategoryName] = React.useState(props.categoryName || 'category name');
  const navigate = useNavigate();
  
  if (props.authState !== AuthState.Authenticated) {
    return (
      <main>
        <h1>Access Denied.</h1>
      </main>)
  } else {
    return (
      <main>
          <h1>Add an Expense</h1>
          <h2>Welcome, {props.userName}!</h2>
          <form onSubmit={(e) => {e.preventDefault(); handleAddExpense(); navigate('/budget');}}>
              <div>
              <span>💵</span>
              <input type="number" placeholder={amount} onChange={(e) => updateAmount(e.target.value)}/>
              </div>

              <div>
              <span>🛒</span>
              <input type="text" placeholder={item} onChange={(e) => updateItem(e.target.value)}/>
              </div>

              <div>
              <span>📝</span>
              <input type="text" placeholder={categoryName} onChange={(e) => updateCategoryName(e.target.value)}/>
              </div>

              <button type="submit">Add Expense</button>
          </form>
          <a target="_blank" href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
      </main>
    );

    function handleAddExpense() {
      const amt = Number(amount);
      const expense = new ExpenseObj(amt, item, categoryName, props.userName);
      props.addExpense(categoryName, expense);
    }
  }
}