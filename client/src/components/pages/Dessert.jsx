import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  requestRecipesData,
  receivedRecipesDataError,
  receivedRecipesData,
} from "../../reducers/actions";

export const Dessert = () => {
  const dispatch = useDispatch();
  let filteredRecipes = useSelector((state) => {
    return state.recipesReducer.dessert.recipes;
  });
  console.log(filteredRecipes);

  const fetchRecipesFromType = async () => {
    dispatch(requestRecipesData());
    try {
      const res = await fetch(`/type/dessert`);
      const json = await res.json();
      console.log(json);
      dispatch(receivedRecipesData({ recipes: json.data, type: "dessert" }));
    } catch (error) {
      dispatch(receivedRecipesDataError());
      console.log(error.message);
    }
  };

  useEffect(() => {
    dispatch(requestRecipesData());
    fetchRecipesFromType();
  }, []);

  return (
    <div>
      {filteredRecipes ? (
        filteredRecipes.map((recipe) => {
          return <div>{recipe.title}</div>;
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
