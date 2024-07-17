import React from "react";
import { Link as LinkR } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavLogo = styled(LinkR)`
  padding: 0 6px;
  text-decoration: none;
  color: inherit;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavLogo to="/">GeeksforGeeks</NavLogo>
      <NavItems>
        <NavLink href="#About">About</NavLink>
        <NavLink href="#Skills">Skills</NavLink>
        <NavLink href="#Experience">Experience</NavLink>
        <NavLink href="#Projects">Projects</NavLink>
        <NavLink href="#Education">Education</NavLink>
      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;
