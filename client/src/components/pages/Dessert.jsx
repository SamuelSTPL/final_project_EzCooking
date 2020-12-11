import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { LoadingIcon } from "../LoadingIcon";
import { ColorSet } from "../../global/ColorSet";
import {
  requestRecipesData,
  receivedRecipesDataError,
  receivedRecipesData,
} from "../../reducers/actions";

export const Dessert = () => {
  const dispatch = useDispatch();
  // let filteredRecipes = useSelector((state) => {
  //   return state.recipesReducer.dessert.recipes;
  // });

  let filteredRecipes;

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
    <Wrapper>
      {filteredRecipes ? (
        filteredRecipes.map((recipe) => {
          return (
            <RecipesContainer key={recipe.id}>
              <Recipe>
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
  background-color: ${ColorSet.primaryLight};
  width: 100%;
`;

const RecipesContainer = styled.div`
  @media (max-width: 500px) {
  }
`;

const Recipe = styled.button`
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

const Loading = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
