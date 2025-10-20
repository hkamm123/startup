import React from 'react';
import {AuthState} from '../login/authState';
import { CategoryObj } from '../budget/categoryObj.js';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function Category(props) {
  const location = useLocation();
  const [catName, setCatName] = React.useState(location.state?.categoryName ?? '');
  const [catLimit, setCatLimit] = React.useState(location.state?.spendingLimit ?? 0);
  const navigate = useNavigate();

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
          <form onSubmit={(e) => {e.preventDefault(); addCategory(catName, catLimit);}}>
              <div>
              <span>📝</span>
              <input type="text" onChange={(e) => setCatName(e.target.value)} placeholder="Category name" value={catName}/>
              </div>

              <div>
              <span>💵</span>
              <input type="number" onChange={(e) => setCatLimit(e.target.value)} placeholder="spending limit" value={catLimit}/>
              </div>

              <Button className="button" type="submit">Add/Edit</Button>
          </form>
          <a target="_blank" href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
      </main>
    );
  }

  function addCategory() {
    props.onEditCategory(catName, catLimit);
    navigate('/budget');
  }
}