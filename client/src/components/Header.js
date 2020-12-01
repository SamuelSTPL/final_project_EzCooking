import React from "react";
import styled from "styled-components";
import { GiMeal } from "react-icons/gi";
import { NavLink } from "react-router-dom";

import { ColorSet } from "../global/ColorSet";
import { BurgerMenu } from "./hamburgerMenu/BurgerMenu";

export const Header = ({ setOpen, open }) => {
  return (
    <Wrapper>
      <TitleContainer>
        <Logo>
          <GiMeal />
        </Logo>
        <Title>
          Ez<TitleSpan>Cooking</TitleSpan>
        </Title>
      </TitleContainer>
      <NavBar>
        <Ul>
          <Li>
            <StyledNavLink exact to="/">
              Home
            </StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink exact to="/myrecipes">
              My Recipes
            </StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink exact to="/login">
              Log In
            </StyledNavLink>
          </Li>
        </Ul>
      </NavBar>
      <BurgerMenu setOpen={setOpen} open={open} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  color: white;
  background-color: ${ColorSet.dark};

  @media (max-width: 500px) {
    flex-direction: column;
    height: 140px;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  @media (max-width: 500px) {
    padding: 10px;
    margin: 0;
  }
`;

const Logo = styled.span`
  margin-top: 5px;
  font-size: 3.5rem;
  margin-right: 20px;
  color: ${ColorSet.primary};
  @media (max-width: 500px) {
    font-size: 2.5rem;
  }
`;

const Title = styled.p`
  font-size: 3rem;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const TitleSpan = styled.span`
  font-style: italic;
  color: ${ColorSet.primary};
`;

const NavBar = styled.nav`
  position: absolute;
  right: 50px;

  @media (max-width: 500px) {
    position: relative;
    right: 0px;
    width: 80%;
    margin-top: 15px;
    margin-left: -70px;
  }
`;

const Ul = styled.ul`
  display: flex;
  @media (max-width: 500px) {
    justify-content: space-around;
  }
`;

const Li = styled.li`
  transition: all 0.2s ease-in-out;

  @media (max-width: 500px) {
    margin-right: 0;
  }

  &:hover {
    transform: scale(1.1);
    font-weight: bolder;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  padding: 5px;

  &.active {
    color: ${ColorSet.primary};
    border-bottom: 4px solid ${ColorSet.primary};
  }
`;
