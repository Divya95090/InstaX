import React from "react";
import styled from "styled-components";
import { 
  HomeRounded, 
  MenuRounded, // Import the Menu icon
  SearchRounded, 
  FavoriteRounded, 
  UploadRounded, 
  LightModeRounded, 
  LogoutRounded,
  DarkModeRounded
} from "@mui/icons-material";
import LogoImage from "../images/Logo.png";
import { Link } from "react-router-dom";

const MenuContainer = styled.div`
  flex: 0.1;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 180px;
    left: ${({ menuOpen }) => (menuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;

const Elements = styled.div`
  padding: 4px 16px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary};
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + "50"};
  }
`;

const NavText = styled.div`
  padding: 12px 0px;
`;

const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text_secondary + "50"};
  margin: 10px 0px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 12px;
  width: 100%;
`;
const MenuIconWrapper = styled.div`
  margin-right: 8px; // Add some space between the menu icon and the logo
  cursor: pointer;
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px; /* Gap between logo image and text */
  font-weight: bold;
  font-size: 20px;
  margin: 16px 0px; /* Adjust margin to reduce gap between menu icon and logo */
`;

const Image = styled.img`
  height: 25px;
`;

const Sidebar = ({ menuOpen, setMenuOpen, setDarkMode, darkMode }) => {
  const menuItems = [
    {
      link: "/",
      name: "Dashboard",
      icon: <HomeRounded />,
    },
    {
      link: "/search",
      name: "Search",
      icon: <SearchRounded />,
    },
    {
      link: "/favourites",
      name: "Favourites",
      icon: <FavoriteRounded />,
    },
  ];

  const buttons = [
    {
      fun: () => console.log("Upload"),
      name: "Upload",
      icon: <UploadRounded />,
    },
    {
      fun: () => setDarkMode(!darkMode),
      name: darkMode ? "Light Mode" : "Dark Mode",
      icon: darkMode ? <LightModeRounded /> : <DarkModeRounded />,
    },
    {
      fun: () => console.log("Log Out"),
      name: "Log Out",
      icon: <LogoutRounded />,
    },
  ];

  return (
    <MenuContainer menuOpen={menuOpen}>
      <Flex>
        <MenuIconWrapper>
          <MenuRounded 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ fontSize: "20px" }}
          />
        </MenuIconWrapper>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo>
            <Image src={LogoImage} alt="Logo" />
            InstaX
          </Logo>
        </Link>
      </Flex>
      {menuItems.map((item, index) => (
        <Link to={item.link} key={index} style={{ textDecoration: 'none', color: 'inherit',width: '100%' }}>
          <Elements>
            {item.icon}
            <NavText>{item.name}</NavText>
          </Elements>
        </Link>
      ))}
      <HR />
      {buttons.map((button, index) => (
        <Elements key={index} onClick={button.fun} style={{ textDecoration: 'none', color: 'inherit',width: '100%' }}>
          {button.icon}
          <NavText>{button.name}</NavText>
        </Elements>
      ))}
    </MenuContainer>
  );
};

export default Sidebar;
