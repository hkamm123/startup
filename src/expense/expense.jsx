import React from 'react';
import {AuthState} from '../login/authState';
import { ExpenseObj } from '../budget/expenseObj';
import { useNavigate } from 'react-router-dom';

export function Expense(props) {
  const [amount, updateAmount] = React.useState(0);
  const [item, updateItem] = React.useState('');
  const [categoryName, updateCategoryName] = React.useState('');
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
              <input type="number" placeholder="Amount" onChange={(e) => updateAmount(e.target.value)}/>
              </div>

              <div>
              <span>🛒</span>
              <input type="text" placeholder="Item" onChange={(e) => updateItem(e.target.value)}/>
              </div>

              <div>
              <span>📝</span>
              <input type="text" placeholder="Category" onChange={(e) => updateCategoryName(e.target.value)}/>
              </div>

              <button type="submit">Add Expense</button>
          </form>
      </main>
    );

    function handleAddExpense() {
      const amt = Number(amount);
      const expense = new ExpenseObj(amt, item, categoryName, props.userName);
      props.addExpense(categoryName, expense);
    }
  }
}