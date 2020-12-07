import React, { useState } from "react";
import styled from "styled-components";

import { Diets, mealType } from "./filtersData";
import { IngredientsFilter } from "./IngredientsFilter";
import { DropdownMenus } from "./DropdownMenus";

export const Filters = ({
  setIngredientFilters,
  setMealFilters,
  setDietFilters,
  mealFilters,
  dietFilters,
}) => {
  return (
    <Wrapper>
      <IngredientsFilter setIngredientFilters={setIngredientFilters} />
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
const DropdownContainers = styled.div``;
const TitleContainerWrapper = styled.div``;
const Title = styled.p``;
