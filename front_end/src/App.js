import { useState, useEffect, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from 'axios'; // Import axios for API calls

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/Logo.png";
import brandDark from "assets/images/Logo-dark.png";
import { AuthProvider } from "layouts/authentication/AuthContext";
import Protected from "layouts/authentication/Protected";
import LiveView from "layouts/LiveView";
import Basic
 from "layouts/authentication/sign-in"; 
import api from "Api";
import { BASE_URL } from "Api";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for RTL
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  // Check if the user is an admin
  const isAdmin = () => {
    // Replace with actual logic to check if the user is an admin
    return true; // or false based on the user's role
  };

  // Determine user role
  const userRole = 'student'; // Replace this with actual user role logic

  // Filter routes based on user role
  const getFilteredRoutes = (routes, userRole) => {
    return routes.filter(route => {
      if (userRole === 'student') {
        return ['wallet', 'transactions', 'services', 'dashboard'].includes(route.key);
      }
      if (userRole === 'bursar') {
        return ['wallet','students', 'transactions', 'dashboard'].includes(route.key);
      }
      if (userRole === 'serviceProvider') {
        return ['transactions', 'wallet', 'dashboard', 'admin'].includes(route.key);
      }
      return true; // Default to include all routes
    });
  };

  const filteredRoutes = getFilteredRoutes(routes, userRole);

  // Open sidenav when mouse enters mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leaves mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        contrast
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <AuthProvider>
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brandName="E-Wallet"
              routes={filteredRoutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        <Routes>
          <Route path='/' element={<Basic/>} />
          {filteredRoutes.map(route => (
            <Route
              path={route.route}
              element={<Protected>{route.component}</Protected>}
              key={route.key}
            />
          ))}
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}


