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
import Reports from "./Reports";
import Anomalies from "./Anomalies";
import Problems from "./Problems";
// Images

export default function ReportHeader({ children }) {
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
                                    label="Alerts"
                                    icon={
                                        <Icon fontSize="small" sx={{ mt: -0.25, color: "#FFB800" }}>
                                            notifications_active
                                        </Icon>
                                    }
                                    sx={{ color: "orange" }} // Tab label color
                                />
                                <Tab
                                    label="Problems"
                                    icon={
                                        <Icon fontSize="small" sx={{ mt: -0.25, color: "red" }}>
                                            report_problem
                                        </Icon>
                                    }
                                    sx={{ color: "red", fontWeight: "bold", fontFamily: "Roboto" }}
                                />

                                <Tab
                                    label="Anomalies"
                                    icon={
                                        <Icon fontSize="small" sx={{ mt: -0.25, color: "orange" }}>
                                            error_outline
                                        </Icon>
                                    }
                                    sx={{ color: "orange", fontWeight: "bold", fontFamily: "Roboto" }}
                                />


                                <Tab
                                    label="Flagged Vehicles"
                                    icon={
                                        <Icon fontSize="small" sx={{ mt: -0.25, color: "purple" }}>
                                            minor_crash
                                        </Icon>
                                    }
                                    sx={{ color: "purple", fontWeight: "bold", fontFamily: "Roboto" }}
                                />


                            </Tabs>
                        </AppBar>
                    </Grid>
                </Grid>
                {tabValue === 0 && <Reports />}
                {tabValue === 1 && <Problems />}
                {tabValue === 2 && <Anomalies />}


            </Card>
        </MDBox>
    );
}

// Setting default props for the Header
ReportHeader.defaultProps = {
    children: "",
};

// Typechecking props for the Header
ReportHeader.propTypes = {
    children: PropTypes.node,
};

