import React from 'react';

export function Category() {
  return (
    <main>
        <h1>Add/Edit a Category</h1>
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