import { useState, useEffect } from "react";
import img1 from "../assets/foodRecipe.png";
import Login from "../components/loginAndRegister/Login";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [Recipes,setRecipes] = useState([])
  
    const getAllRecipes = async () => {
        try{
            const res = await axios.get("http://localhost:5000/recipes")
            setRecipes(res.data.recipes)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getAllRecipes()
    },[])

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function toNavigate() {
    if (!localStorage.getItem("token")) {
      setIsOpen(true);
      return;
    }
    navigate("/addrecipe")
  }
  return (
    <>
      <section className="flex ">
        <div className="p-8">
          <h1 className="text-6xl">Recipe App</h1>
          <div className="py-4 font-medium">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            incidunt labore quae accusantium, voluptates dolorum! Ea quidem
            repudiandae fuga molestiae aliquid culpa veniam sapiente aperiam.
            Nam, aliquid laborum. Inventore, natus.
          </div>
          <button onClick={toNavigate} className="bg-emerald-600 p-2 rounded-lg text-white hover:bg-emerald-900">
            Share your recipe
          </button>
        </div>
        <div>
          <img src={img1} />
        </div>
      </section>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#72BAA9"
            fillOpacity="1"
            d="M0,192L30,160C60,128,120,64,180,32C240,0,300,0,360,37.3C420,75,480,149,540,186.7C600,224,660,224,720,192C780,160,840,96,900,90.7C960,85,1020,139,1080,160C1140,181,1200,171,1260,154.7C1320,139,1380,117,1410,106.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      <section className="m-5"> 
        <RecipeCard Recipes={Recipes} />
      </section>
      {isOpen && <Login setIsOpen={setIsOpen} />}
    </>
  );
}
export default Home;
