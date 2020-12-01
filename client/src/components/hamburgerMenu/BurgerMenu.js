import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import { ColorSet } from "../../global/ColorSet";

export const BurgerMenu = ({ setOpen, open }) => {
  console.log(open);
  return (
    <HamburgerButton onClick={() => setOpen(!open)}>
      <GiHamburgerMenu />
    </HamburgerButton>
  );
};

const HamburgerButton = styled.button`
  background: transparent;
  position: absolute;
  visibility: hidden;
  font-size: 2rem;
  color: ${ColorSet.primary};
  border: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 500px) {
    visibility: visible;
    right: 30px;
    top: 85px;
  }
`;
