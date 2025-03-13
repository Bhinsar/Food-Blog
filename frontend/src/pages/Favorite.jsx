import RecipeCard from "../components/RecipeCard/RecipeCard";
import { useState, useEffect } from "react";

function Favorite() {
  const [favRecipes, setFavRecipes] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("fav")) || [];
    setFavRecipes(storedFavs);
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl m-4 font-bold">My Favorite Recipes</h1>
      {favRecipes.length > 0 ? (
        <RecipeCard Recipes={favRecipes} />
      ) : (
        <p className="text-gray-500 text-center mt-4">No favorite recipes yet!</p>
      )}
    </div>
  );
}

export default Favorite;
