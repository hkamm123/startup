import React from 'react';
import {AuthState} from '../login/authState';
import { CategoryObj } from '../budget/categoryObj.js';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function Category(props) {
  const location = useLocation();
  const nameFromState = location.state?.categoryName;
  const navigate = useNavigate();
  const category = (props.budget && Array.isArray(props.budget.categories))
    ? props.budget.categories.find(c => c.name === nameFromState)
    : undefined;

  const categoryName = category?.name ?? nameFromState ?? '';
  const spendingLimit = category?.spendingLimit ?? 0;
  console.log("editing category:", categoryName, spendingLimit); // TODO: remove
  
  const [catName, setCatName] = React.useState(categoryName);
  const [catLimit, setCatLimit] = React.useState(spendingLimit);

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
    props.onEditCategory(catName, Number(catLimit));
    navigate('/budget');
  }
}