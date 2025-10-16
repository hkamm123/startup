import React from 'react';
import './budget.css';

export function Budget() {
  return (
    <main>
      <h1>My Budget</h1>

      <div className="budget-content">
        <div className="recent-transactions">
          <section>
            <h3>Recent Transactions</h3>
            <ul>
                <li><a href="/budget">🗑️</a>Hyrum added hot dogs for $37 in Groceries</li>
                <li><a href="/budget">🗑️</a>Hyrum added gas for $20 in Groceries</li>
            </ul>
          </section>
        </div>
          
        <div className="budget-category">
          <section>
            <h2>Groceries</h2>
            <progress value="37" max="100"></progress>
            <p>Spent: $37/$100</p>
            <a href="/category">edit</a>
            <hr></hr>
          </section>
        </div>

        <div className="budget-category">
          <section>
            <h2>Gas</h2>
            <progress value="20" max="75"></progress>
            <p>Spent: $20/$75</p>
            <a href="/category">edit</a>
            <hr></hr>
          </section>
        </div>
      </div>

      <a href="/category">Add a Category</a>
      <a target="_blank" href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
    </main>
  );
}