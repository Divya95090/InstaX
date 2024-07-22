import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Themes";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"; // Make sure to import useSelector
import Dashboard from "./pages/Dashboard";
import DisplayVideo from "./pages/DisplayVideo";
import Search from "./pages/Search";
import VideoDetails from "./pages/VideoDetails";
import Profile from "./pages/Profile";
import Signup from "./components/SignUp"; // Corrected import paths
import Signin from "./components/Signin"; // Corrected import paths
import Upload from "./components/Upload";
import Saved from "./pages/Saved";

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bg};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [SignUpOpen, setSignUpOpen] = useState(false);
  const [SignInOpen, setSignInOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  // Assuming 'opensi' is used for some conditional rendering logic
  const { opensi } = useSelector((state) => state.signin);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
      {opensi && <Signin setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />}
        {SignUpOpen && <Signup setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />}
        {uploadOpen && <Upload setUploadOpen={setUploadOpen} />}
        <Container>
          {menuOpen && (
            <Sidebar
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              setDarkMode={setDarkMode}
              darkMode={darkMode}
              setUploadOpen={setUploadOpen}
            />
          )}
          <Frame>
            <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen}
            />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/search" element={<Search />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/video/:id" element={<VideoDetails />} />
              <Route path="/showvideos/:type" element={<DisplayVideo />} />
            </Routes>
          </Frame>
        </Container>
        {SignUpOpen && <Signup setSignUpOpen={setSignUpOpen} />} {/* Conditional rendering for Signup */}
        {SignInOpen && <Signin setSignInOpen={setSignInOpen} />} {/* Conditional rendering for Signin */}
        {uploadOpen && <Upload setUploadOpen={setUploadOpen} />}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
