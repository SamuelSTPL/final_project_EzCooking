import React from "react";
import styled from "styled-components";

export const Sidebar = () => {
  return (
    <Wrapper>
      <ul>
        <li>Quick Search</li>
        <li>Main Course</li>
        <li>Lunch</li>
        <li>Vegetarian</li>
        <li>Vegan</li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
