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
import { ColorSet } from "../../global/ColorSet";

export const QuickSearch = () => {
  const { combinedFilters, setIngredientFilters } = useContext(FiltersContext);

  const dispatch = useDispatch();
  let filteredRecipes = useSelector((state) => {
    return state.recipesReducer.filtered.recipes;
  });

  console.log("Returned recipes from BE", filteredRecipes);

  //Fetch recipes
  const fetchRecipesFromQuickSearch = async () => {
    dispatch(requestRecipesData());

    try {
      const res = await fetch(`/quicksearch`, {
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(combinedFilters),
        method: "POST",
      });

      const json = await res.json();
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
      <SearchContainer>
        <Filters />
        <FiltersDisplay />
        <ButtonsContainer>
          <Buttons onClick={() => handleClick()}>I'm Hungry!</Buttons>
          <Clear onClick={() => setIngredientFilters([])}>Clear Filters</Clear>
        </ButtonsContainer>
      </SearchContainer>
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
const SearchContainer = styled.div`
  @media (max-width: 500px) {
    width: 100%;
    background-color: rgba(130, 183, 75, 0.5);
    padding: 7px 0px;
    border-bottom: 10px solid ${ColorSet.dark};
  }
`;

const ButtonsContainer = styled.div`
  @media (max-width: 500px) {
    display: flex;
    justify-content: space-around;
    margin: 20px auto;
    width: 90%;
  }
`;
const Buttons = styled.button`
  @media (max-width: 500px) {
    font-weight: bold;
    font-size: 1.1rem;
    border-radius: 10px;
    border: none;
    height: 40px;
    width: 160px;
    margin-left: 15px;
    color: ${ColorSet.primary};
    background-color: ${ColorSet.dark};
  }
`;

const Clear = styled(Buttons)`
  color: rgb(238, 119, 98);
`;
