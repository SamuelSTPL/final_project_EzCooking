import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import {
  requestRecipesData,
  receivedRecipesDataError,
  receivedRecipesData,
} from "../../reducers/actions";
import { Filters } from "../FiltersDropdowns/Filters";

export const QuickSearch = () => {
  const [ingredientFilters, setIngredientFilters] = useState([]);
  const [mealFilters, setMealFilters] = useState("");
  const [dietFilters, setDietFilters] = useState("");

  const dispatch = useDispatch();
  let filteredRecipes = useSelector((state) => {
    return state.recipesReducer.mainCourse.recipes;
  });

  console.log(filteredRecipes);

  const fetchRecipesFromQuickSearch = async () => {
    dispatch(requestRecipesData());

    let filters = {};
    if (ingredientFilters) {
      filters.ingredientFilters = ingredientFilters;
    }
    if (mealFilters) {
      filters.mealFilters = mealFilters;
    }
    if (ingredientFilters) {
      filters.dietFilters = dietFilters;
    }

    try {
      const res = await fetch(`/type/quicksearch`, {
        method: "POST",
        body: JSON.stringify(filters),
      });
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
    // fetchRecipesFromQuickSearch();
  }, [ingredientFilters, mealFilters, dietFilters]);

  console.log(ingredientFilters);
  // console.log(mealFilters);
  // console.log(dietFilters);
  return (
    <Wrapper>
      <Filters
        setIngredientFilters={setIngredientFilters}
        setMealFilters={setMealFilters}
        setDietFilters={setDietFilters}
        mealFilters={mealFilters}
        dietFilters={dietFilters}
      />
      {filteredRecipes ? (
        filteredRecipes.map((recipe) => {
          return <div>{recipe.title}</div>;
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
