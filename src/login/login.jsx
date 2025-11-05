import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  const [recipeImgUrl, setRecipeImgUrl] = React.useState('');
  const [recipeLink, setRecipeLink] = React.useState('');

  React.useEffect(async () => {
    async function getRandomRecipe() {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php', {
        method: 'GET'
      });
      const data = await res.json();
      return { "image":data.meals[0].strMealThumb, "url": data.meals[0].strSource || data.meals[0].strYoutube }
    }
    const recipeData = await getRandomRecipe();
    setRecipeImgUrl((recipeData).image);
    setRecipeLink((recipeData).url);
  }, []);


  return (
    <main>
        { authState !== AuthState.Unknown && <h1>Welcome to NoNonCents!</h1> }
        { authState === AuthState.Authenticated && <Authenticated userName={userName} onLogout={() => onAuthChange(AuthState.Unauthenticated)} /> }
        { authState === AuthState.Unauthenticated && <Unauthenticated userName={userName} onLogin={(username) => onAuthChange(AuthState.Authenticated, username)} /> }
        <aside>
            <img src={recipeImgUrl} width="100"></img>
            <a target="_blank" href={recipeLink}>recipe of the day</a>
        </aside>
    </main>
  );
}