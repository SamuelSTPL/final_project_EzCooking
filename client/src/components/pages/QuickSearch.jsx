import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { requestRecipesData } from "../../reducers/actions";

export const QuickSearch = () => {
  const dispatch = useDispatch();
  // let filteredRecipes = useSelector();

  const fetchRecipesFromUserFilters = async (filtersArray) => {
    dispatch(requestRecipesData);
    try {
      const res = await fetch(``);
      const json = await res.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  return <div>Quick Search</div>;
};
