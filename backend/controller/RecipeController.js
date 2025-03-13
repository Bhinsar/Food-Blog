const Recipe = require("../model/recipe");
const multer = require("multer");
const mongoose = require("mongoose");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Recipes/coverImages"); 
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\s+/g, "_");
    const filename = `${timestamp}-${originalName}`;
    cb(null, filename);
  },
});

exports.upload = multer({ storage: storage });

//view all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ recipes });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

//Add Recipe by user
exports.addRecipe = async (req, res) => {
  //console.log(req.user);
  const { title, ingredients, instructions, time } = req.body;

  try {
    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file.filename,
      createdby: req.user.id,
    });

    return res
      .status(201)
      .json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

//find a recipe by id
exports.getRecipeById = async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

//update a recipe
exports.updateRecipe = async (req, res) => {
  const id = req.params.id;
  console.log("Uploaded file:", req.file); 

  const { title, ingredients, instructions, time } = req.body;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title,
        ingredients,
        instructions,
        time,
        coverImage: req.file ? req.file.filename : recipe.coverImage,
      },
      { new: true }
    );

    res.status(200).json({ message: "Recipe updated successfully", updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};


//delete a recipe
exports.deleteRecipe = async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

//Get user uploaded by user
exports.getRecipeByUser = async (req, res) => {
  // console.log(req.user);
  const id = req.user.id;
  try {
    const recipe = await Recipe.find({ createdby: id });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
