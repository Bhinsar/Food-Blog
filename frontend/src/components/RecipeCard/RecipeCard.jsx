import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function RecipeCard({ Recipes }) {
  const path = window.location.pathname === "/myrecipe";

  // Get favorites from localStorage
  const [favItems, setFavItems] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favItems));
  }, [favItems]);

  // Delete Recipe
  const deleteMyRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipe/${id}`);
      window.location.reload
    } catch (err) {
      console.log(err);
    }
  };

  const favRecipe = (recipe) => {
    const isAlreadyFav = favItems.some((fav) => fav._id === recipe._id);

    if (isAlreadyFav) {
      setFavItems((prevFavs) => prevFavs.filter((fav) => fav._id !== recipe._id));
    } else {
      setFavItems((prevFavs) => [...prevFavs, recipe]);
    }
  };

  return (
    <>
      {Recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="shadow-slate-600 inline-block w-52 h-64 shadow-lg rounded-lg m-4"
        >
          <img
            src={`http://localhost:5000/images/${recipe.coverImage}`}
            alt={recipe.title}
            className="p-2 flex justify-center h-48 w-52 object-cover rounded-t-lg"
          />
          <div className="p-2 flex justify-between items-center">
            <h2 className="text-sm font-semibold">{recipe.title}</h2>
            {!path ? (
              <FaHeart
                onClick={() => favRecipe(recipe)}
                className={`cursor-pointer ${
                  favItems.some((fav) => fav._id === recipe._id)
                    ? "text-red-600"
                    : "hover:text-red-600"
                }`}
              />
            ) : (
              <div className="flex space-x-2">
                <Link to={`/editRecipe/${recipe._id}`}>
                  <FaEdit className="hover:text-blue-900 cursor-pointer" />
                </Link>
                <MdDelete
                  onClick={() => deleteMyRecipe(recipe._id)}
                  className="hover:text-red-600 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default RecipeCard;
