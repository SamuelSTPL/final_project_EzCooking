import React, { useState } from "react";
import styled from "styled-components";

export const IngredientsFilter = ({ setIngredientFilters }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addFilter = (e) => {
    setIngredientFilters((state) => {
      let ingredients = [...state];
      console.log(state);
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
      <Label>Ingredient:</Label>
      <Input value={input} type="text" onChange={handleChange}></Input>
      <Submit type="submit">Add Filter</Submit>
    </IngredientsContainer>
  );
};

const IngredientsContainer = styled.form``;
const Label = styled.label``;
const Input = styled.input``;
const Submit = styled.button``;
