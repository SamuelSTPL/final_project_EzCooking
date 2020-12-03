import React, { createContext, useState } from "react";

const initialState = {};

export const RecipesContext = createContext(null);

export const RecipesProvider = ({ children }) => {
  const [currentRecipes, setCurrentRecipes] = useState([]);

  const fetchRecipesFromUserFilters = async (filtersArray) => {
    try {
      const res = await fetch(``);
      const json = await res.json();
      setCurrentRecipes(json);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <RecipesContext.Provider
      value={{ currentRecipes, setCurrentRecipes, fetchRecipesFromUserFilters }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
