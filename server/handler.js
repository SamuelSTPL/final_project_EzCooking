const fetch = require("node-fetch");
require("dotenv").config();
const { sortRecepies } = require("./Utils/utils");
const apiKey = process.env.SPOONACULAR_API;

// TODO:
// Randomize recipes for diet and type ??
//Use Offset to implement a pagination

//Quick Search
const getRecipesFromQuickSearch = async (req, res) => {
  let { filters } = req.body;

  //Filtering the array of params
  const filteredParams = filters.reduce((acc, item, index) => {
    if (!index) {
      return `${item},`;
    } else if (index !== filters.length - 1) {
      return acc + `+${item},`;
    } else {
      return acc + `+${item}`;
    }
  }, "");

  //Defense
  if (!filters) {
    return res.status(404).json({
      status: 404,
      message: "Please enter valid filters",
      data: filters,
    });
  }
  try {
    const raw = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${filteredParams}&number=10`,
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await raw.json();

    //Sort by number of likes
    const sortedRecipes = sortRecepies(data);

    res
      .status(200)
      .json({ status: 200, message: "Success", data: sortedRecipes });
  } catch (error) {
    console.log(error.message);
  }
};

//Diet
const getRecipesFromDiet = async (req, res) => {
  console.log(req.params);
  let { diet } = req.params;

  if (!diet) {
    return res.status(404).json({
      status: 404,
      message: "Please enter valid category",
      data: diet,
    });
  }

  try {
    const raw = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${diet}&number=10`,
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await raw.json();

    // console.log(data);
    //Sort by number of likes
    const sortedRecipes = sortRecepies(data.results);
    res
      .status(200)
      .json({ status: 200, message: "Success", data: sortedRecipes });
  } catch (error) {
    console.log(error.message);
  }
};

//Type
const getRecipesFromMealTypes = async (req, res) => {
  console.log(req.params);
  let { type } = req.params;
  if (!type) {
    return res.status(404).json({
      status: 404,
      message: "Please enter valid type of meal",
      data: type,
    });
  }

  try {
    console.log(type);
    const raw = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}&number=10`,
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await raw.json();
    console.log(data);
    //Sort by number of likes
    const sortedRecipes = await sortRecepies(data.results);
    res
      .status(200)
      .json({ status: 200, message: "Success", data: sortedRecipes });
  } catch (error) {
    console.log(error.message);
  }
};

//Id
const getRecipeFromId = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    return res.status(404).json({
      status: 404,
      message: "Please enter valid recipe id",
      data: id,
    });
  }

  try {
    const raw = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await raw.json();
    res.status(200).json({ status: 200, message: "Success", data: data });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getRecipesFromQuickSearch,
  getRecipesFromDiet,
  getRecipesFromMealTypes,
  getRecipeFromId,
};
