/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import History from "./History";
import OnPremise from "./OnPremise";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";
import Visitors from "./Visitors";
import NewApplications from "./NewApplications";
import RejectedApplications from "./RejectedApplications";
import { TableView } from "@mui/icons-material";
// Images

export default function VisitorHeader({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);


  return (
    <MDBox position="relative" mb={5} mt={7}>

      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">

          <Grid item xs={12} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="Approved"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25, color: "green" }}>
                      check_circle
                    </Icon>
                  }
                  sx={{ color: "green" }} // Tab label color
                />

                <Tab
                  label="New Applications"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25, color: "blue" }}>
                      send
                    </Icon>
                  }
                  sx={{ color: "blue", fontWeight: "bold", fontFamily: "Roboto" }}
                />
                <Tab
                  label="On Premise"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25, color: "orange" }}>
                      location_on
                    </Icon>
                  }
                  sx={{ color: "orange" }} // Tab label color
                />
                <Tab
                  label="History"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25, color: "grey" }}>
                      history
                    </Icon>
                  }
                  sx={{ color: "grey" }} // Tab label color
                />
                <Tab
                  label="Rejected"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25, color: "red" }}>
                      cancel
                    </Icon>
                  }
                  sx={{ color: "red" }} // Tab label color
                />




              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {tabValue === 0 && <Visitors />}
        {tabValue === 1 && <NewApplications />}
        {tabValue === 2 && <OnPremise />}
        {tabValue === 3 && <History />}
        {TableView === 4 && <RejectedApplications />}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
VisitorHeader.defaultProps = {
  children: "",
};

// Typechecking props for the Header
VisitorHeader.propTypes = {
  children: PropTypes.node,
};

