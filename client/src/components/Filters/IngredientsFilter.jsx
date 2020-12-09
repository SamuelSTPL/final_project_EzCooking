import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiltersContext } from "../Context/FiltersContext";

import { ColorSet } from "../../global/ColorSet";

export const IngredientsFilter = () => {
  const [input, setInput] = useState("");
  const { setIngredientFilters } = useContext(FiltersContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addFilter = (e) => {
    setIngredientFilters((state) => {
      let ingredients = [...state];
      if (ingredients.length < 3) {
        ingredients.push(input);
      }
      return ingredients;
    });
  };
  return (
    <IngredientsContainer
      onSubmit={(e) => {
        e.preventDefault();
        addFilter(e);
        setInput("");
      }}
    >
      <Label>Add up to 3 ingredients!</Label>
      <InputContainer>
        <Input value={input} type="text" onChange={handleChange}></Input>
        <Submit type="submit">Add</Submit>
      </InputContainer>
    </IngredientsContainer>
  );
};

const IngredientsContainer = styled.form`
  width: 100%;
  @media (max-width: 500px) {
    text-align: center;
    margin-top: 20px;
  }
`;
const Label = styled.label`
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const InputContainer = styled.div`
  @media (max-width: 500px) {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

const Input = styled.input`
  font-size: 1.5rem;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
  @media (max-width: 500px) {
    border-radius: 10px;
    height: 40px;
    border: none;
    width: 230px;
  }
`;
const Submit = styled.button`
  @media (max-width: 500px) {
    font-weight: bold;
    font-size: 1.1rem;
    border-radius: 10px;
    border: none;
    height: 40px;
    width: 100px;
    margin-left: 15px;
    color: ${ColorSet.primary};
    background-color: ${ColorSet.dark};
  }
`;
