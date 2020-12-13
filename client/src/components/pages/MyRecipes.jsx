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
          <TitleContainer>
            <FavoriteTitle>My Favorites</FavoriteTitle>
          </TitleContainer>
          {favoritesRecipe.length > 0 ? (
            favoritesRecipe.map((favoriteRecipe) => {
              return (
                <Recipe onClick={() => handleClick(favoriteRecipe.id)}>
                  <Img src={favoriteRecipe.image} />
                  <Title>{favoriteRecipe.title}</Title>
                </Recipe>
              );
            })
          ) : (
            <NoRecipesContainer>
              Add recipes to your favorites first
            </NoRecipesContainer>
          )}
          <ButtonContainer>
            <LogOut
              onClick={() => {
                signOut();
                history.push("/login");
              }}
            >
              Sign Out
            </LogOut>
          </ButtonContainer>
        </SignedInContainer>
      ) : (
        <NoUserContainer>
          <LinkContainer>
            <TextForLinks>
              You need an accout to save your favorite recipes!
            </TextForLinks>
            <StyledLinks to="/signup">Sign me up!</StyledLinks>
          </LinkContainer>
          <LinkContainer>
            <TextForLinks>You already have an account?</TextForLinks>
            <StyledLinks to="/login">Login</StyledLinks>
          </LinkContainer>
        </NoUserContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  min-height: 85vh;
  background-color: ${ColorSet.primaryLight};
  @media (max-width: 500px) {
  }
`;

const SignedInContainer = styled.div`
  height: 100%;
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
  height: 85vh;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
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

const NoRecipesContainer = styled.div`
  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 550px;
    font-style: italic;
    color: ${ColorSet.dark};
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

const FavoriteTitle = styled.p`
  @media (max-width: 500px) {
    font-size: 1.9rem;
    color: ${ColorSet.dark};
    text-decoration: underline;
    font-weight: bold;
  }
`;

const TitleContainer = styled.div`
  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    height: 50px;
  }
`;

const ButtonContainer = styled.div`
  background-color: transparent;
  bottom: 0;
  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
    height: 120px;
  }
`;

const LogOut = styled.button`
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    font-size: 1.3rem;
    height: 40px;
    width: 200px;
    margin-top: 15px;
    border: 3px solid ${ColorSet.red};
    color: ${ColorSet.red};
    background-color: white;
    border-radius: 10px;
  }
`;

const TextForLinks = styled.p`
  @media (max-width: 500px) {
    font-size: 1.3rem;
  }
`;

const StyledLinks = styled(Link)`
  @media (max-width: 500px) {
    font-size: 1.3rem;
    color: ${ColorSet.dark};
  }
`;
