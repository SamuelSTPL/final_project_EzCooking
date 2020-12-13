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
            <Score>
              {recipeData.spoonacularScore && recipeData.spoonacularScore}
            </Score>
          </TitleAndScoreContainer>

          <DietsContainer>
            {recipeData.diets ? (
              recipeData.diets.map((diet) => {
                return <Diet key={diet}>{diet}</Diet>;
              })
            ) : (
              <p>No diets specifications</p>
            )}
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
                    <Instructions>
                      <InstructionNumber>{step.number}-</InstructionNumber>
                      {step.step}
                    </Instructions>
                  );
                })}
              </div>
            )}
          </InstructionsContainer>
          <AddToFavsContainer>
            <FavButton onClick={() => addToFavorites(recipeData.id)}>
              Add to my recipes!
            </FavButton>
          </AddToFavsContainer>
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
  background-color: ${ColorSet.primaryLight};
  @media (max-width: 500px) {
  }
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
  /* background-color: ${ColorSet.primaryLight}; */
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 85vh;
  width: 60%;
  margin: auto;
  @media (max-width: 500px) {
    width: 90%;
    margin: 0px auto;
    padding-top: 20px;
  }
`;

const Img = styled.img`
  border-radius: 10px;
  width: 600px;

  @media (max-width: 500px) {
    width: 450px;
  }
`;

const DietsContainer = styled.div`
  margin-top: 20px;
  height: 40px;
  @media (max-width: 500px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: white;
    border-radius: 50px;
  }
`;

const Diet = styled.span`
  color: ${ColorSet.dark};
  @media (max-width: 500px) {
  }
`;

const TitleAndScoreContainer = styled.div`
  @media (max-width: 500px) {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
  }
`;

const Title = styled.p`
  @media (max-width: 500px) {
    font-size: 1.6rem;
    font-weight: bold;
    color: ${ColorSet.dark};
  }
`;

const Score = styled.div`
  border: 3px solid ${ColorSet.dark};
  padding: 10px;
  background-color: white;
  border-radius: 50%;
  color: ${ColorSet.primary};
  font-weight: bolder;
  font-size: 1.2rem;
  @media (max-width: 500px) {
  }
`;

const IngredientsContainer = styled.div`
  margin: 20px auto;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

const Ingredient = styled.p`
  font-size: 1.3rem;
  color: ${ColorSet.dark};
  @media (max-width: 500px) {
    margin: 5px 0 5px 15px;
  }
`;

const InstructionsContainer = styled.div`
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  @media (max-width: 500px) {
  }
`;

const Instructions = styled.p`
  font-size: 1.3rem;
  color: ${ColorSet.dark};
  @media (max-width: 500px) {
    margin-top: 10px;
  }
`;

const AddToFavsContainer = styled.div`
  background-color: transparent;
  bottom: 0;
  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
    height: 120px;
  }
`;

const FavButton = styled.button`
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  box-shadow: 0px 10px 13px -7px gray, 5px 5px 15px 5px rgba(0, 0, 0, 0);

  @media (max-width: 500px) {
    font-size: 1.3rem;
    height: 40px;
    width: 200px;
    margin-top: 15px;
    border: 3px solid ${ColorSet.primary};
    color: ${ColorSet.primary};
    background-color: white;
    border-radius: 10px;
  }
`;

const InstructionNumber = styled.span`
  margin-right: 5px;
  font-weight: bold;
`;
