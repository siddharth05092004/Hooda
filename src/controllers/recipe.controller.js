const data = require('./../models/recipe.model.js')



async function post_data(req,res) {
    const { title, making_time, serves, ingredients, cost } = req.body;

  // Check if all required fields are provided
  if (!title || !making_time || !serves || !ingredients || !cost) {
    return res.status(200).json({
      message: 'Recipe creation failed!',
      required: "title, making_time, serves, ingredients, cost"
    });
  }

  try {
    // Create a new recipe document
    const newRecipe = new data({ title, making_time, serves, ingredients, cost });
    const savedRecipe = await newRecipe.save();
    const return_data = await data.findOne({ "_id": savedRecipe._id });
    // Send success response
    res.status(200).json({
      message: 'Recipe successfully created!',
      recipe: [
        return_data
      ]
    });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Failed to create recipe' });
  }
}

async function get_selected(database_object_id) {

    let get_desired_data = await data.findOne({ "_id": database_object_id });
    if (!get_desired_data) {
        return JSON.stringify
            ({ "error": "Can't fetch playlist data" , "code": 2})
}
const return_data = data.findOne({ "_id": database_object_id });
return return_data;
    
}

async function get_data() {
    let get_desired_data = await data.find();
return get_desired_data;
    
}

async function patch_selected(req,res){

    const recipeId = req.params.id;
  const updates = req.body;

  try {
    // Find the recipe by ID and update it
    const updatedRecipe = await data.findByIdAndUpdate(recipeId, updates, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({
      message: 'Recipe successfully updated!',
      recipe: {
        title: updatedRecipe.title,
        making_time: updatedRecipe.making_time,
        serves: updatedRecipe.serves,
        ingredients: updatedRecipe.ingredients,
        cost: updatedRecipe.cost
      }
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Failed to update recipe' });
  }
}


async function delete_selected(req,res){

    const recipeId = req.params.id;

  try {
    // Find the recipe by ID and delete it
    const deletedRecipe = await data.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: 'No recipe found!' });
    }

    res.status(200).json({
      message: 'Recipe successfully removed!'
    });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Failed to delete recipe' });
  }
}


module.exports = { post_data, get_data, get_selected ,patch_selected,delete_selected}