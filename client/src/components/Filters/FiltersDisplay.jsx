import React, { useContext } from "react";
import styled from "styled-components";

import { FiltersContext } from "../Context/FiltersContext";

export const FiltersDisplay = () => {
  const { ingredientFilters } = useContext(FiltersContext);

  return (
    <Wrapper>
      {ingredientFilters.length > 0 ? (
        <FiltersContainer>
          <List>
            {ingredientFilters.map((filter) => {
              return <Filter key={filter}>{filter}</Filter>;
            })}
          </List>
        </FiltersContainer>
      ) : (
        <FiltersContainer>
          <NoFilter>No ingredients added</NoFilter>
        </FiltersContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const FiltersContainer = styled.div`
  @media (max-width: 500px) {
    position: relative;
    margin: auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 60px;
    border-radius: 10px;
  }
`;
const List = styled.ul`
  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
  }
`;
const Filter = styled.li`
  font-size: 1.5rem;
  @media (max-width: 500px) {
    margin: 0px 20px;
  }
`;

const NoFilter = styled.p`
  @media (max-width: 500px) {
    align-self: center;
    margin-top: 1.2rem;
    color: gray;
    font-style: italic;
  }
`;
