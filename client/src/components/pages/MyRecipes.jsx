import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { ColorSet } from "../../global/ColorSet";
import { AuthContext } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export const MyRecipes = () => {
  const { currentUserId, signOut, getCurrentUser, currentUser } = useContext(
    AuthContext
  );
  const history = useHistory();
  const [favoritesRecipeId, setFavoritesRecipeId] = useState([]);
  const [favoritesRecipe, setFavoritesRecipe] = useState([]);

  const handleClick = (id) => {
    history.push(`/recipe-details/${id}`);
  };

  const getFavoritesRecipesIdFromUser = () => {
    if (currentUser) {
      let stringId;
      if (currentUser.favorites.length === 1) {
        stringId = currentUser.favorites[0].toString();
        setFavoritesRecipeId(stringId);
      } else {
        stringId = currentUser.favorites.join();
        setFavoritesRecipeId(stringId);
      }
    }
  };

  const fetchFavorites = async () => {
    //Fetch all recipes from the array
    try {
      if (favoritesRecipeId.length > 0) {
        const res = await fetch(`/recipes/${favoritesRecipeId}`, {
          headers: {
            "Content-type": "application/json",
          },
        });
        const json = await res.json();
        setFavoritesRecipe(json.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
    getFavoritesRecipesIdFromUser();
    fetchFavorites();
  }, [currentUserId, favoritesRecipeId]);

  console.log(favoritesRecipe);
  return (
    <Wrapper>
      {currentUser ? (
        <SignedInContainer>
          <NameContainer>
            <Text>Welcome back,</Text>
            <UserName>{currentUser.name}</UserName>
          </NameContainer>
          {favoritesRecipe ? (
            favoritesRecipe.map((favoriteRecipe) => {
              return (
                <Recipe onClick={() => handleClick(favoriteRecipe.id)}>
                  <Img src={favoriteRecipe.image} />
                  <Title>{favoriteRecipe.title}</Title>
                </Recipe>
              );
            })
          ) : (
            <div>Add recipes to your favorites!</div>
          )}
          <button
            onClick={() => {
              signOut();
              history.push("/login");
            }}
          >
            Sign Out
          </button>
        </SignedInContainer>
      ) : (
        <NoUserContainer>
          <div>
            You need an accout to save your favorite recipes!
            <Link to="/signup">Sign me up!</Link>
          </div>
          <div>
            You already have an account?
            <Link to="/login">Login</Link>
          </div>
        </NoUserContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  background-color: ${ColorSet.primaryLight};
  @media (max-width: 500px) {
  }
`;

const SignedInContainer = styled.div`
  min-height: 85vh;
  @media (max-width: 500px) {
  }
`;

const NameContainer = styled.div`
  @media (max-width: 500px) {
    height: 70px;
    background-color: ${ColorSet.dark};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NoUserContainer = styled(SignedInContainer)`
  height: 100%;
  @media (max-width: 500px) {
  }
`;

const UserName = styled.span`
  color: ${ColorSet.primary};
  margin: auto 15px;
  font-style: italic;
  @media (max-width: 500px) {
    font-size: 1.6rem;
  }
`;

const Text = styled.span`
  color: white;
  @media (max-width: 500px) {
    font-size: 1.4rem;
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

const RecipesContainer = styled.div`
  @media (max-width: 500px) {
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
