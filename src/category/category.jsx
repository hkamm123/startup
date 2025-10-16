import React from 'react';
import {AuthState} from '../login/authState';

export function Category(props) {
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
              <input type="text" placeholder="category name" />
              </div>

              <div>
              <span>💵</span>
              <input type="number" placeholder="spending limit" />
              </div>

              <button type="submit">Add Category</button>
          </form>
          <a target="_blank" href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
      </main>
    );
  }
}