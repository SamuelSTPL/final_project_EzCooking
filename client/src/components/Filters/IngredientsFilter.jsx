import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiltersContext } from "../Context/FiltersContext";

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
        <Submit type="submit">Add Ingredient</Submit>
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
  }
`;

const Input = styled.input`
  &:focus {
    outline: none;
  }
  @media (max-width: 500px) {
    border-radius: 10px;
    height: 30px;
    border: none;
  }
`;
const Submit = styled.button`
  @media (max-width: 500px) {
    border-radius: 10px;
    border: none;
    height: 30px;
    margin-left: 15px;
  }
`;
