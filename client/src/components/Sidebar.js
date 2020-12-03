import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { ColorSet } from "../global/ColorSet";

export const Sidebar = () => {
  return (
    <Wrapper>
      <Li>
        <Link to="/home/quicksearch">Quick Search</Link>
      </Li>
      <Li>
        <Link to="/home/lunch">Lunch Recipes</Link>
      </Li>
      <Li>
        <Link to="/home/maincourse">Main Course Recipes</Link>
      </Li>
      <Li>
        <Link to="/home/vegetarian">Vegetarian Recipes</Link>
      </Li>
      <Li>
        <Link to="/home/vegan">Vegan Recipes</Link>
      </Li>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(130, 183, 75, 0.5);
  height: 90vh;
`;

const Link = styled(NavLink)`
  color: ${ColorSet.dark};
  text-decoration: none;
  margin-top: 70px;
  font-size: 1.7rem;
  &.active {
    border-bottom: 4px solid ${ColorSet.dark};
  }
`;

const Li = styled.li`
  list-style: none;
  margin-top: 70px;
  font-weight: bold;
`;
