import React from "react";
import styled from "styled-components";

import { ColorSet } from "../../global/ColorSet";

export const Menu = ({ open }) => {
  return (
    <Wrapper open={open}>
      <Link href="/">Quick Search</Link>
      <Link href="/">Main Course</Link>
      <Link href="/">Lunch</Link>
      <Link href="/">Vegetarian</Link>
      <Link href="/">Vegan</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  visibility: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${ColorSet.dark};
  right: 0px;
  height: 60vh;
  width: 70%;
  @media (max-width: 500px) {
    visibility: ${(props) => (props.open ? "visible" : "hidden")};
  }
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  margin-top: 70px;
  font-size: 1.5rem;
`;
