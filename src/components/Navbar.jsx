import React from "react";
import { Link as LinkR} from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
background-color: ${({ theme }) => theme.bg};
height: 80px;
display: flex;
align-items: center;
justify-content:center;
font-size: 1rem;
position: sticky;
top: 0;
z-index: 10;
color:white;
`;
const NavLogo = styled(LinkR)`
padding: 0 6px;
text-decoration: none;
color:inherit;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavLogo to="/">
        <a style = {{
            color: "white",
        }}
        >GeeksforGeeks</a>
       </NavLogo>
    </NavbarContainer>
    );
};

export default Navbar;