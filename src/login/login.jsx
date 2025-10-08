import React from 'react';

export function Login() {
  return (
    <main>
        <h1>Welcome to NoNonCents!</h1>
        <form method="get" action="/budget">
            <span>Please Log In or Create an Account</span>
            <input type="text" placeholder="your@email.com" />
            <input type="password" placeholder="password" />

            <button type="submit">Login</button>
            <button type="submit">Create</button>
        </form>
        <aside>
            <img src="512546.webp" width="100"></img>
            <a href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
        </aside>
    </main>
  );
}