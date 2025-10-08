import React from 'react';
import './budget.css';

export function Budget() {
  return (
    <main>
      <h1>My Budget</h1>

      <div class="budget-content">
        <div class="recent-transactions">
          <section>
            <h3>Recent Transactions</h3>
            <ul>
                <li><a to="/budget">🗑️</a>Hyrum added hot dogs for $37 in Groceries</li>
                <li><a to="/budget">🗑️</a>Hyrum added gas for $20 in Groceries</li>
            </ul>
          </section>
        </div>
          
        <div class="budget-category">
          <section>
            <h2>Groceries</h2>
            <progress value="37" max="100"></progress>
            <p>Spent: $37/$100</p>
            <a to="/category">edit</a>
            <hr></hr>
          </section>
        </div>

        <div class="budget-category">
          <section>
            <h2>Gas</h2>
            <progress value="20" max="75"></progress>
            <p>Spent: $20/$75</p>
            <a to="/category">edit</a>
            <hr></hr>
          </section>
        </div>
      </div>

      <a to="/category">Add a Category</a>
      <a href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
    </main>
  );
}