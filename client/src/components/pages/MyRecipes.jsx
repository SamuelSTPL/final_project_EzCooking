import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { AuthContext } from "../Context/AuthContext";
import { db } from "../../firebase";

export const MyRecipes = () => {
  const { currentUserId } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();

  console.log(currentUser);
  // console.log(currentUserId);

  const getCurrentUser = () => {
    db.collection("users")
      .doc(currentUserId)
      .get()
      .then((doc) => {
        let data = doc.data();
        setCurrentUser(data);
        // console.log(currentUser);
      });
  };

  useEffect(() => {
    getCurrentUser();
  }, [currentUserId]);

  return (
    <Wrapper>
      {currentUser ? (
        <div>
          Hi {currentUser.name}
          {currentUser.favorites}
        </div>
      ) : (
        <div>You need an accout to save your favorite recipes!</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
