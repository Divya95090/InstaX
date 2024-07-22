import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { openSignin } from "../redux/setSigninSlice";
import LogoImage from "../images/Logo.png";


const NavbarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 40px;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7px);
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ButtonDiv = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 70px;
  padding: 8px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;
const Welcome = styled.div`
  font-size: 26px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;
  padding: 8px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px; /* Adjust this gap to reduce the space */
  margin-left: 10px;
`;

const Logo = styled.img`
  height: 25px; /* Adjust the height as needed */
  width: auto;
`;

const InstaXText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  line-height: 20px; /* Adjust line-height to match the height of Logo */
`;

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <NavbarDiv>
      <LeftSection>
        <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon />
        </IcoButton>
        {!menuOpen && (
          <LogoContainer>
            <Logo src={LogoImage} alt="Logo" />
            <InstaXText>InstaX</InstaXText>
          </LogoContainer>
        )}
      </LeftSection>
      {currentUser ? (
        <Welcome>Welcome, {currentUser.name}</Welcome>
      ) : (
        <div>&nbsp;</div>
      )}
      {currentUser ? (
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Avatar src={currentUser.img}>
            {currentUser.name.charAt(0).toUpperCase()}
          </Avatar>
        </Link>
      ) : (
        <ButtonDiv onClick={() => dispatch(openSignin())}>
          <PersonIcon style={{ fontSize: "18px" }} />
          Login
        </ButtonDiv>
      )}
    </NavbarDiv>
  );
};

export default Navbar;
