import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard/RecipeCard";

function MyRecipe() {
  const [myRecipe, setMyRecipe] = useState([]);
  const [error, seterror] = useState("")

  const getMyRecipe = async() =>{
    try{
      const response = await axios.get("http://localhost:5000/recipe",{
        headers:{
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
      setMyRecipe(response.data.recipe)
      seterror("")
    }
    catch(error){
      console.log(error);
      seterror("No Recipe found")
    }
  }

  useEffect(()=>{
    getMyRecipe()
  },[])
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl m-4 text-bold">My Recipe</h1>
      <RecipeCard Recipes={myRecipe}/>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  )
}export default MyRecipe;