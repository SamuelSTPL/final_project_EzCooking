import React, { useContext } from "react";
import styled from "styled-components";

import { Diets, mealType } from "./filtersData";
import { IngredientsFilter } from "./IngredientsFilter";
import { DropdownMenus } from "./DropdownMenus";
import { FiltersContext } from "../Context/FiltersContext";

export const Filters = () => {
  const {
    setMealFilters,
    setDietFilters,
    mealFilters,
    dietFilters,
  } = useContext(FiltersContext);

  return (
    <Wrapper>
      <IngredientInputContainer>
        <IngredientsFilter />
      </IngredientInputContainer>
      <DropdownWrapper>
        <DropdownContainers>
          <TitleContainerWrapper>
            <Title>Diets</Title>
          </TitleContainerWrapper>
          <DropdownMenus
            data={Diets}
            setValue={setDietFilters}
            value={mealFilters}
          />
        </DropdownContainers>
        <DropdownContainers>
          <TitleContainerWrapper>
            <Title>Meal Type</Title>
          </TitleContainerWrapper>
          <DropdownMenus
            data={mealType}
            setValue={setMealFilters}
            value={dietFilters}
          />
        </DropdownContainers>
      </DropdownWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  @media (max-width: 500px) {
    display: block;
  }
`;

const IngredientInputContainer = styled.div`
  @media (max-width: 500px) {
    margin-bottom: 20px;
  }
`;

const DropdownWrapper = styled.div`
  @media (max-width: 500px) {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
`;

const DropdownContainers = styled.div`
  @media (max-width: 500px) {
    display: flex;
    align-items: center;
  }
`;

const TitleContainerWrapper = styled.div``;

const Title = styled.p`
  margin-right: 9px;
`;
