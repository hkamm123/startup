import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">
    <header>
        <h1>NoNonCents</h1>
        <nav>
            <menu>
            <li><a href="index.html">Home</a></li>
            <li><a href="budget.html">My Budget</a></li>
            <li><a href="expense.html">Add Expense</a></li>
            </menu>
        </nav>
    </header>

    <main>
        Main components will go here
    </main>

    <footer>
        <p>Created by Hyrum Kammerman</p>
        <a href="https://github.com/hkamm123/startup">GitHub</a>
    </footer>
  </div>;
}