import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { AuthContext } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export const MyRecipes = () => {
  const { currentUserId, signOut, getCurrentUser, currentUser } = useContext(
    AuthContext
  );
  const history = useHistory();
  const [favoritesRecipe, setFavoritesRecipe] = useState([]);

  // let favoritesRecipe = [];
  // console.log(currentUser);

  const fetchFavorites = async () => {
    //Fetch all recipes from the array
  };

  useEffect(() => {
    getCurrentUser();
    fetchFavorites();
  }, [currentUserId]);

  return (
    <Wrapper>
      {currentUser ? (
        <div>
          Hi {currentUser.name}
          {favoritesRecipe &&
            favoritesRecipe.map((favoriteRecipe) => {
              return <li key={favoriteRecipe.title}>{favoriteRecipe}</li>;
            })}
          <button
            onClick={() => {
              signOut();
              history.push("/");
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          You need an accout to save your favorite recipes!
          <Link to="/signup">Sign me up!</Link>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;
