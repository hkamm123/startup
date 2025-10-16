import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main>
        { authState !== AuthState.Unknown && <h1>Welcome to NoNonCents!</h1> }
        { authState === AuthState.Authenticated && <Authenticated userName={userName} onLogout={() => onAuthChange(AuthState.Unauthenticated)} /> }
        { authState === AuthState.Unauthenticated && <Unauthenticated userName={userName} onLogin={(username) => onAuthChange(AuthState.Authenticated, username)} /> }
        <aside>
            <img src="512546.webp" width="100"></img>
            <a target="_blank" href="https://tasty.co/recipe/one-pot-garlic-parmesan-chicken-pasta">recipe of the day</a>
        </aside>
    </main>
  );
}