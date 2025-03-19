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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data

import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// import "react-datepicker/dist/react-datepicker.css";
import ViewCurrentVehicles from "./ViewCurrentVehicles";
import BasicSelect from "./Select";
import React from "react";
import { useEffect } from "react";
// Dashboard components
import { useState } from "react";
import axios from "axios";
import { format } from 'date-fns';
import VisitsModal from "./visitsModal";
import VehicleCountModeSelect from "./countMode";
import { BASE_URL } from "Api";

import {Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Label, Popover} from 'react-aria-components';
import ViolationModeSelect from "./violationMode";

function Analytics() {
  const [showViewVehicles, setShowViewVehicles] = useState(false);
  const { sales, tasks } = reportsLineChartData;
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [Mode, setMode] = useState('all')
  const [history, setHistory] = useState(null)
  const [dateInfo, setDateInfo] = useState(null);
  const [countInfo, setCountInfo] = useState(null)
  const [visitsModalOpen, setVisitsModalOpen] = useState(false);
  const [startTime, setStartTime] = React.useState('');
const [endTime, setEndTime] = React.useState('');
  
   // Function to fetch date information from the API
   const fetchDateInfo = async (date) => {
    try {
      const response = await axios.get(`${BASE_URL}/day_week_month`, {
        params: { day: date },
      });
      setDateInfo(response.data);
    } catch (error) {
      console.error('Error fetching date information:', error);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchDateInfo(date);
  }, [date]); // Empty dependency array means this effect runs once when the component mounts

  const [reportBarChartDataWeekly, setReportBarChartDataWeekly] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: {
      label: "Vehicles",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  });

  const [reportsBarChatDataHourly, setReportBarChartDataHourly] = useState({
    labels: ["0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h"],
    datasets: { label: "vehicles", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  })

  const [reportsBarChartDataMonthly, setReportBarChartDataMonthly] = useState( {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {label: "Vehicles",data: [0,0,0,0,0,0,0,0,0,0,0,0,
      ],
    },
  })

  useEffect(() => {
    const fetchWeeklyData = async () => {
      if (Mode && date) {
        try {
          const response = await axios.get(`${BASE_URL}/analytics_week`, {
            params: {
              mode: Mode.toLowerCase(),
              day: date // Use the state value for date
            }
          });
          setReportBarChartDataWeekly(response.data);
        } catch (error) {
          console.error('Error fetching data:', error); // More descriptive error handling
        }
      }
    };

    fetchWeeklyData();
  }, [Mode, date]); // Ensure this effect runs when `mode` or `date` changes

  useEffect(() => {
    const fetchHourlyData = async () => {
      if (Mode && date) {
        try {
          const response = await axios.get(`${BASE_URL}/analytics_hourly`, {
            params: {
              mode: Mode.toLowerCase(),
              day: date // Use the state value for date
            }
          });
          setReportBarChartDataHourly(response.data);
        } catch (error) {
          console.error('Error fetching data:', error); // More descriptive error handling
        }
      }
    };

    fetchHourlyData();
  }, [Mode, date]); // Ensure this effect runs when `mode` or `date` changes
  
  useEffect(() => {
    const fetchMonthlyData = async () => {
      if (Mode && date) {
        try {
          const response = await axios.get(`${BASE_URL}/analytics_monthly`, {
            params: {
              mode: Mode.toLowerCase(),
              day: date // Use the state value for date
            }
          });
          setReportBarChartDataMonthly(response.data);

        } catch (error) {
          console.error('Error fetching data:', error); // More descriptive error handling
        }
      }
    };

    fetchMonthlyData();
  }, [Mode, date]); // Ensure this effect runs when `mode` or `date` changes

  const handleChange = (e) => {
    setDate(e.target.value);
  };
  const handleImportClick = () => {
    if (showImportStaff) {
    setShowImportStaff(false);
    } else {
    setShowImportStaff(true);
    }
  };
  const handleViewVehicles = () => {
    if (showViewVehicles){
      setShowViewVehicles(false)
    }
    else{
      setShowViewVehicles(true)

    }

  }
  const onModeChange = (label) => {
    setMode(label);
  };
  
  const { day, week, month } = dateInfo || {};

  const handleViewVisits = () => {
    setVisitsModalOpen(true);
  };

  const handleCloseVisitsModal = () => {
    setVisitsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
           
            <div className="container-fluid p-2 mt-2" style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                }}>
                <div className="row">
                
                    <div className="col m-3">
  
                    <BasicSelect onModeChange ={onModeChange}/>
                    </div>
                </div>
                </div>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
             
              <div className="form-group" lassName="form-group" style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                }}>
                <label htmlFor="date" style={{
                    fontSize: '14px', // Reduce font size to 14px
                }}>Pick a date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleChange}
                    className="form-control"
                />
                </div>
              
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
          <Grid>
           
           <div className="container-fluid p-2 mt-2" style={{
               backgroundColor: 'white',
               borderRadius: '10px',
               padding: '20px',
               boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
               }}>
               <div className="row">
               
                   <div className="col m-3">
 
                   <VehicleCountModeSelect onModeChange ={onModeChange}/>
                   </div>
               </div>
               </div>
         </Grid>
</Grid>
<Grid item xs={12} md={6} lg={3}>
          <Grid>
           
           <div className="container-fluid p-2 mt-2" style={{
               backgroundColor: 'white',
               borderRadius: '10px',
               padding: '20px',
               boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
               }}>
               <div className="row">
               
                   <div className="col m-3">
 
                   <ViolationModeSelect onModeChange ={onModeChange}/>
                   </div>
               </div>
               </div>
         </Grid>
</Grid>

        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3} >
                <ReportsBarChart
                  color="info"
                  title="Vehicles daily count"
                //   description="Last Campaign Performance"
                  date={day}
                  chart={reportsBarChatDataHourly}
                  
                />
                
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="Vehicles weekly count"
                  date= {week}
                  chart={reportBarChartDataWeekly}
                />
              </MDBox>
            </Grid> 
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="dark"
                  title="vehicles monthly count"
                  date={month}
                  chart={reportsBarChartDataMonthly}
                />
              </MDBox>
            </Grid> 
          </Grid>
        </MDBox>
        <MDBox>
          
        </MDBox>
      </MDBox>
      <VisitsModal open={visitsModalOpen} onClose={handleCloseVisitsModal}/>

    </DashboardLayout>
  );
}

export default Analytics;
