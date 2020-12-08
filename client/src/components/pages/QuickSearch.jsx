import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import {
  requestRecipesData,
  receivedRecipesDataError,
  receivedRecipesData,
} from "../../reducers/actions";
import { FiltersContext } from "../Context/FiltersContext";
import { Filters } from "../Filters/Filters";
import { FiltersDisplay } from "../Filters/FiltersDisplay";

export const QuickSearch = () => {
  const { combinedFilters } = useContext(FiltersContext);

  const dispatch = useDispatch();
  let filteredRecipes = useSelector((state) => {
    return state.recipesReducer.filtered.recipes;
  });

  console.log("Returned recipes from BE", filteredRecipes);

  //Fetch recipes
  const fetchRecipesFromQuickSearch = async () => {
    // dispatch(requestRecipesData());
    try {
      console.log("Combined filters FE", combinedFilters);
      console.log("Body", JSON.stringify(combinedFilters));
      const res = await fetch(`/quicksearch`, {
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(combinedFilters),
        method: "POST",
        // body: JSON.stringify({ text: "try" }),
      });
      console.log("Res:", res);
      const json = await res.json();
      console.log(json);
      dispatch(receivedRecipesData({ recipes: json.data, type: "filtered" }));
    } catch (error) {
      dispatch(receivedRecipesDataError());
      console.log(error.message);
    }
  };

  const handleClick = () => {
    fetchRecipesFromQuickSearch();
  };

  return (
    <Wrapper>
      <Filters />
      <FiltersDisplay />
      <button onClick={() => handleClick()}>I'm Hungry!</button>
      {filteredRecipes ? (
        filteredRecipes.map((recipe) => {
          return <li key={recipe.title}>{recipe.title}</li>;
        })
      ) : (
        <div>Loading...</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
