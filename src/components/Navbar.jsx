import React from "react";
import { Link as LinkR } from "react-router-dom";
// import { Button } from "react-scroll";
import styled from "styled-components";
import { Bio } from "../data/constants";

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
  width: 80%; 
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

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
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

      <ButtonContainer>
        <GithubButton href = {Bio.github} target="_Blank">Github profile</GithubButton>
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default Navbar;