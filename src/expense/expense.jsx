import React from 'react';
import {AuthState} from '../login/authState';

export function Expense(props) {
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
          <form method="get" action="/budget">
              <div>
              <span>💵</span>
              <input type="number" placeholder="$10" />
              </div>

              <div>
              <span>🛒</span>
              <input type="text" placeholder="item" />
              </div>

              <div>
              <span>📝</span>
              <input type="text" placeholder="category" />
              </div>

              <button type="submit">Add Expense</button>
          </form>
          <a target="_blank" href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
      </main>
    );
  }
}