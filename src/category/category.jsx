import React from 'react';
import {AuthState} from '../login/authState';
import { CategoryObj } from '../budget/categoryObj.js';

export function Category(props) {
  const [catName, setCatName] = React.useState('');
  const [catLimit, setCatLimit] = React.useState(0);

  if (props.authState !== AuthState.Authenticated) {
    return (
      <main>
        <h1>Access Denied.</h1>
      </main>)
  } else {
    return (
      <main>
          <h1>Add/Edit a Category</h1>
          <h2>Welcome, {props.userName}!</h2>
          <form method="get" action="/budget">
              <div>
              <span>📝</span>
              <input type="text" onChange={(e) => setCatName(e.target.value)} placeholder="category name" />
              </div>

              <div>
              <span>💵</span>
              <input type="number" onChange={(e) => setCatLimit(e.target.value)} placeholder="spending limit" />
              </div>

              <button onClick={() => addCategory(catName, catLimit)}>Add Category</button>
          </form>
          <a target="_blank" href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
      </main>
    );
  }

  function addCategory() {
    props.budget.addCategory(new CategoryObj(catName, catLimit))
    localStorage.setItem('budget', JSON.stringify(props.budget));
  }
}