import {useState} from 'react'
import axios from 'axios'
function AddRecipe(){
    const [formData, setFormData] = useState({
        "title": "",
        "ingredients": "",
        "instructions": "",
        "time": "",
        "coverImage": ""
    });
    const [message,setMessage]=useState("")
    const [error,setError]=useState("")

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const val = (name === "coverImage" && files) ? files[0] : value;
        setFormData({
            ...formData,
            [name]: val
        });
    };
    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log(formData)
        try{
            const res = await axios.post("http://localhost:5000/recipe",formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem('token') 
                }
            })
            console.log(res.data) 
            setError("")
            setMessage(res.data.message)
        }catch(err){
            console.log(err)
            setError("Something went wrong")
        }
    }

    return(
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Add Recipe</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col">
                <label className="font-medium mb-2" htmlFor="recipeName">
                    Recipe Name:
                </label>
                <input
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2"
                    type="text"
                    name="title"
                    placeholder="Enter recipe name"
                    required
                />
                </div>
                <div className="flex flex-col">
                <label className="font-medium mb-2" htmlFor="ingredients">
                    Ingredients Required:
                </label>
                <textarea
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 h-32"
                    id="ingredients"
                    name="ingredients"
                    placeholder="List all ingredients"
                    required
                ></textarea>
                </div>
                <div className="flex flex-col">
                <label className="font-medium mb-2" htmlFor="procedure">
                    Procedure:
                </label>
                <textarea
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 h-32"
                    id="instructions"
                    name="instructions"
                    placeholder="Describe the steps"
                    required
                ></textarea>
                </div>

                {/* Time */}
                <div className="flex flex-col">
                <label className="font-medium mb-2" htmlFor="time">
                    Time Required:
                </label>
                <input
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2"
                    type="text"
                    id="time"
                    name="time"
                    placeholder="e.g., 30 minutes"
                    required
                />
                </div>
                <div className="flex flex-col">
                <label className="font-medium mb-2" htmlFor="coverImage">
                    Upload Image:
                </label>
                <input
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2"
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    required
                />
                </div>

                <button
                type="submit"
                className="bg-emerald-600 text-white rounded-md p-3 font-medium hover:bg-emerald-800"
                >
                Add Recipe
                </button>
            </form>
            {message && <p className="text-green-500 text-center mt-4">{message}</p>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>

    )
}export default AddRecipe;