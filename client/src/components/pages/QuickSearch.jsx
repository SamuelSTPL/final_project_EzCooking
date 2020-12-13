import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { LoadingIcon } from "../LoadingIcon";

import {
  requestRecipesData,
  receivedRecipesDataError,
  receivedRecipesData,
} from "../../reducers/actions";
import { FiltersContext } from "../Context/FiltersContext";
import { Filters } from "../Filters/Filters";
import { FiltersDisplay } from "../Filters/FiltersDisplay";
import { ColorSet } from "../../global/ColorSet";
import { useHistory } from "react-router-dom";

export const QuickSearch = () => {
  const { combinedFilters, setIngredientFilters } = useContext(FiltersContext);
  const history = useHistory();
  const dispatch = useDispatch();
  let filteredRecipes = useSelector((state) => {
    return state.recipesReducer.filtered.recipes;
  });

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

  const handleHungryClick = () => {
    fetchRecipesFromQuickSearch();
  };

  const handleClick = (id) => {
    history.push(`/recipe-details/${id}`);
  };

  console.log(filteredRecipes);
  return (
    <Wrapper>
      <SearchContainer>
        <Filters />
        <FiltersDisplay />
        <ButtonsContainer>
          <Buttons onClick={() => handleHungryClick()}>I'm Hungry!</Buttons>
          <Clear onClick={() => setIngredientFilters([])}>Clear Filters</Clear>
        </ButtonsContainer>
      </SearchContainer>
      {filteredRecipes ? (
        filteredRecipes.map((recipe) => {
          return (
            <RecipesContainer key={recipe.id}>
              <Recipe onClick={() => handleClick(recipe.id)}>
                <Img src={recipe.image} />
                <Title>{recipe.title}</Title>
              </Recipe>
            </RecipesContainer>
          );
        })
      ) : (
        <>
          <LoadingIcon />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${ColorSet.primaryLight};
`;
const SearchContainer = styled.div`
  @media (max-width: 500px) {
    width: 100%;
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
  box-shadow: 0px 10px 13px -7px gray;
  border: 3px solid ${ColorSet.primary};
  @media (max-width: 500px) {
    font-weight: bold;
    font-size: 1.1rem;
    border-radius: 10px;
    height: 40px;
    width: 160px;
    margin-left: 15px;
    color: ${ColorSet.primary};
    background-color: white;
  }
`;

const Clear = styled(Buttons)`
  color: ${ColorSet.red};
  border: 3px solid ${ColorSet.red};
`;
const RecipesContainer = styled.div`
  @media (max-width: 500px) {
  }
`;

const Recipe = styled.button`
  background-color: white;
  color: ${ColorSet.dark};
  border: none;
  border-radius: 10px;
  box-shadow: 0px 10px 13px -7px gray, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
  }
`;

const Img = styled.img`
  @media (max-width: 500px) {
    width: 380px;
    border-radius: 15%;
    margin-top: 10px;
  }
`;

const Title = styled.p`
  @media (max-width: 500px) {
    margin: 10px auto;
    font-size: 1.5rem;
  }
`;
