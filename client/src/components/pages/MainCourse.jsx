import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  requestRecipesData,
  receivedRecipesDataError,
  receivedRecipesData,
} from "../../reducers/actions";

export const MainCourse = () => {
  const dispatch = useDispatch();
  let filteredRecipes = useSelector((state) => {
    return state.recipesReducer.mainCourse.recipes;
  });
  console.log(filteredRecipes);

  const fetchRecipesFromDiet = async () => {
    dispatch(requestRecipesData());
    try {
      const res = await fetch(`/type/vegetarian`);
      const json = await res.json();
      console.log(json);
      dispatch(receivedRecipesData({ recipes: json.data, type: "mainCourse" }));
    } catch (error) {
      dispatch(receivedRecipesDataError());
      console.log(error.message);
    }
  };

  useEffect(() => {
    dispatch(requestRecipesData());
    fetchRecipesFromDiet();
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
