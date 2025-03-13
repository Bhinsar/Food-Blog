const express = require('express');
const router = express.Router();
const { addRecipe,getAllRecipes,getRecipeById,updateRecipe,deleteRecipe,upload, getRecipeByUser} = require('../controller/RecipeController'); 
const { auth } = require('../middleware/auth');

router.get('/recipes', getAllRecipes);
router.post('/recipe', upload.single('coverImage'), auth, addRecipe); 
router.get('/recipe/:id', getRecipeById);
router.put('/recipe/:id', upload.single('coverImage'), updateRecipe);
router.delete('/recipe/:id', deleteRecipe);
router.get('/recipe', auth, getRecipeByUser);

module.exports = router;
