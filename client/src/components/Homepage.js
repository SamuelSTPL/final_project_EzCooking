import React from "react";
import styled from "styled-components";

import { Sidebar } from "./Sidebar";
import { Menu } from "./hamburgerMenu/Menu";

export const Homepage = ({ open, setOpen }) => {
  return (
    <Wrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <div>Homepage</div>
      <Menu open={open} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
const SidebarWrapper = styled.div`
  width: 20%;
  @media (max-width: 500px) {
    visibility: hidden;
    width: 0%;
  }
`;
