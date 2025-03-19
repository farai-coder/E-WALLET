

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
import Payment from "./Payment";
import PaymentHistory from "./History";
import PendingPayments from "./Pending";
import TransactionSettings from "./Settings";

function Header({ children }) {
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
                  label="Payment"
                  // LinkComponent={<Security/>}
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      payment
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
                  label="Pending"
                  // LinkComponent={<UserProfile/>}
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      pending
                    </Icon>
                  }
                />
                 <Tab
                  label="Settings"
                  // LinkComponent={<UserProfile/>}
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      settings
                    </Icon>
                  }
                />
                 
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {tabValue === 0 && <Payment/>}
        {tabValue === 1 && <PaymentHistory/>}
        {tabValue === 2 && <PendingPayments/>}
        {tabValue === 3 && <TransactionSettings/>}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
