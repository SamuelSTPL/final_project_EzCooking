import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../Context/AuthContext";
import { LoadingIcon } from "../LoadingIcon";
import { ColorSet } from "../../global/ColorSet";

export const RecipeDetails = () => {
  const [recipeData, setRecipeData] = useState();
  const { addToFavorites, currentUser } = useContext(AuthContext);
  let { id } = useParams();

  if (currentUser) {
    console.log(currentUser);
  }
  // console.log(id);
  console.log(recipeData);
  const fetchSingleRecipe = async () => {
    try {
      const res = await fetch(`/recipe/${id}`);
      const json = await res.json();
      setRecipeData(json.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSingleRecipe();
  }, []);

  return (
    <Wrapper>
      {recipeData ? (
        <RecipeContainer>
          {recipeData.image && <Img src={recipeData.image} />}
          <TitleAndScoreContainer>
            <Title>{recipeData.title}</Title>
            <button onClick={() => addToFavorites(recipeData.id)}>
              Add to my recipes!
            </button>
            <Score>
              {recipeData.spoonacularScore && recipeData.spoonacularScore}
            </Score>
          </TitleAndScoreContainer>

          <DietsContainer>
            {recipeData.diets &&
              recipeData.diets.map((diet) => {
                return <Diet key={diet}>{diet}</Diet>;
              })}
          </DietsContainer>
          <IngredientsContainer>
            {recipeData.extendedIngredients &&
              recipeData.extendedIngredients.map((ingredient) => {
                return (
                  <Ingredient key={ingredient.id}>
                    {ingredient.original}
                  </Ingredient>
                );
              })}
          </IngredientsContainer>
          <InstructionsContainer>
            {recipeData.analyzedInstructions && (
              <div>
                {recipeData.analyzedInstructions[0].steps.map((step) => {
                  return (
                    <li>
                      {step.number}-{step.step}
                    </li>
                  );
                })}
              </div>
            )}
          </InstructionsContainer>
        </RecipeContainer>
      ) : (
        <Loading>
          <LoadingIcon />
        </Loading>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Loading = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${ColorSet.primaryLight};
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const RecipeContainer = styled.div`
  @media (max-width: 500px) {
    width: 90%;
    margin: 10px auto;
  }
`;

const Img = styled.img`
  @media (max-width: 500px) {
    width: 450px;
    border-radius: 10px;
  }
`;

const DietsContainer = styled.div`
  @media (max-width: 500px) {
  }
`;

const Diet = styled.span`
  @media (max-width: 500px) {
  }
`;

const TitleAndScoreContainer = styled.div`
  @media (max-width: 500px) {
  }
`;

const Title = styled.p`
  @media (max-width: 500px) {
  }
`;

const Score = styled.p`
  @media (max-width: 500px) {
  }
`;

const IngredientsContainer = styled.div`
  @media (max-width: 500px) {
  }
`;

const Ingredient = styled.li`
  @media (max-width: 500px) {
  }
`;

const InstructionsContainer = styled.div`
  @media (max-width: 500px) {
  }
`;
