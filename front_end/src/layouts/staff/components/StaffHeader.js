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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";
import OnPremise from "./OnPremise";
import Access from "./Access";
import History from "./History";
// Images
import Staff from "./Staff";

function StaffHeader({ children }) {
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
    <MDBox position="relative" mb={5} mt={10}>

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
                  label="Staff"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      people
                    </Icon>
                  }
                />

                <Tab
                  label="On Premise"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      location_on
                    </Icon>
                  }
                />

                <Tab
                  label="History"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      history
                    </Icon>
                  }
                />

                <Tab
                  label="Access"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      lock_open
                    </Icon>
                  }
                />

              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {tabValue === 0 && <Staff />}
        {tabValue === 1 && <OnPremise />}
        {tabValue === 2 && <History />}
        {tabValue === 3}

      </Card>
    </MDBox>
  );
}

// Setting default props for the StaffHeader
StaffHeader.defaultProps = {
  children: "",
};

// Typechecking props for the StaffHeader
StaffHeader.propTypes = {
  children: PropTypes.node,
};

export default StaffHeader;
