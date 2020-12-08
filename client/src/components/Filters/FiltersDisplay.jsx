import React, { useContext } from "react";
import styled from "styled-components";

import { FiltersContext } from "../Context/FiltersContext";

export const FiltersDisplay = () => {
  const { ingredientFilters, setIngredientFilters } = useContext(
    FiltersContext
  );

  return (
    <Wrapper>
      {ingredientFilters.length > 0 ? (
        <FiltersContainer>
          <List>
            {ingredientFilters.map((filter) => {
              return <Filter key={filter}>{filter}</Filter>;
            })}
          </List>
          <ClearFilters onClick={() => setIngredientFilters([])}>
            Clear
          </ClearFilters>
        </FiltersContainer>
      ) : (
        <div>
          <p>No ingredients added</p>
        </div>
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
    margin: auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
`;
const List = styled.ul`
  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
  }
`;
const Filter = styled.li`
  font-size: 2rem;
  @media (max-width: 500px) {
    margin: 0px 20px;
  }
`;
const ClearFilters = styled.button`
  @media (max-width: 500px) {
    align-self: center;
  }
`;
