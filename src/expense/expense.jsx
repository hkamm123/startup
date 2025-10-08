import React from 'react';

export function Expense() {
  return (
    <main>
        <h1>Add an Expense</h1>
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
        <a href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
    </main>
  );
}