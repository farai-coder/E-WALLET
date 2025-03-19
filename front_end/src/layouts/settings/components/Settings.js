import React from 'react'
import "./Settings.css"
import Switch from "react-switch";
import { useState } from 'react';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Settings() {
  const [checked, setChecked] = useState(false);
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <DashboardLayout>
    <DashboardNavbar/>
    
    <div className="container">
        
        <div className="row justify-content-start">
            <div className="col-12 col-lg-10 col-xl-8 mx-auto">
            {/* <h2 className="h3 mb-4 page-title">Settings</h2> */}
            <div className="my-4">
                <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">System</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Security</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Connectivity</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Storage management</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Emergency</a>
                </li>
                
                </ul>
                {/* <h5 className="mb-0 mt-5">Security Settings</h5>
                <p>These settings are helps you keep your account secure.</p> */}
                <div className="list-group mb-5 shadow">
                <div className="list-group-item">
                    <div className="row align-items-center">
                    <div className="col">
                        <strong className="mb-2">Enable Activity Logs</strong>
                        <p className="text-muted mb-0">Donec id elit non mi porta gravida at eget metus.</p>
                    </div>
                    <div className="col-auto">
                        <div className="custom-control custom-switch">
                        <Switch onChange={handleChange} checked={checked} onHandleColor={'#fff'} onColor={'#1A35FF'}/>
    
                        <span className="custom-control-label" />
                        </div>
                    </div>
                    </div>
                </div>
                <div className="list-group-item">
                    <div className="row align-items-center">
                    <div className="col">
                        <strong className="mb-2">2FA Authentication</strong>
                        <span className="badge badge-pill badge-success">Enabled</span>
                        <p className="text-muted mb-0">Maecenas sed diam eget risus varius blandit.</p>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary btn-sm">Disable</button>
                    </div>
                    </div>
                </div>
                <div className="list-group-item">
                    <div className="row align-items-center">
                    <div className="col">
                        <strong className="mb-2">Activate Pin Code</strong>
                        <p className="text-muted mb-0">Donec id elit non mi porta gravida at eget metus.</p>
                    </div>
                    <div className="col-auto">
                        <div className="custom-control custom-switch">
                        <Switch onChange={handleChange} checked={checked} onHandleColor={'#fff'} onColor={'#1A35FF'}/>
                        <span className="custom-control-label" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                
                {/* <h5 className="mb-0">Recent Activity</h5>
                <p>Last activities with your account.</p> */}
                {/* <table className="table border bg-white">
                <thead>
                    <tr>
                    <th>Device</th>
                    <th>Location</th>
                    <th>IP</th>
                    <th>Time</th>
                    <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="col"><i className="fe fe-globe fe-12 text-muted mr-2" />Chrome - Windows 10</th>
                    <td>Paris, France</td>
                    <td>192.168.1.10</td>
                    <td>Apr 24, 2019</td>
                    <td><a hreff="#" className="text-muted"><i className="fe fe-x" /></a></td>
                    </tr>
                    <tr>
                    <th scope="col"><i className="fe fe-smartphone fe-12 text-muted mr-2" />App - Mac OS</th>
                    <td>Newyork, USA</td>
                    <td>10.0.0.10</td>
                    <td>Apr 24, 2019</td>
                    <td><a hreff="#" className="text-muted"><i className="fe fe-x" /></a></td>
                    </tr>
                    <tr>
                    <th scope="col"><i className="fe fe-globe fe-12 text-muted mr-2" />Chrome - iOS</th>
                    <td>London, UK</td>
                    <td>255.255.255.0</td>
                    <td>Apr 24, 2019</td>
                    <td><a hreff="#" className="text-muted"><i className="fe fe-x" /></a></td>
                    </tr>
                </tbody>
                </table> */}
            </div>
        </div>
      </div>
    </div>
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          platform settings
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          account
        </MDTypography>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={followsMe} onChange={() => setFollowsMe(!followsMe)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Email me when someone follows me
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={answersPost} onChange={() => setAnswersPost(!answersPost)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Email me when someone answers on my post
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={mentionsMe} onChange={() => setMentionsMe(!mentionsMe)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Email me when someone mentions me
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox mt={3}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            application
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={newLaunches} onChange={() => setNewLaunches(!newLaunches)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              New launches and projects
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={productUpdate} onChange={() => setProductUpdate(!productUpdate)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Monthly product updates
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Subscribe to newsletter
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
    </DashboardLayout>

  )
}

export default Settings

