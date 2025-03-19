import React, { useEffect, useState } from 'react';
import "./Admin.css";
import Switch from "react-switch";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import api from 'Api';
import { BASE_URL } from 'Api';

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

  useEffect(() => {
    // Fetch data from the API
    fetch(`${BASE_URL}/settings/`)
      .then(response => response.json())
      .then(data => {
        // Update the state based on the API response
        setChecked(data.activity_logs);
        setFollowsMe(data.system_logs);
        setAnswersPost(data.system_updates);
        setMentionsMe(data.real_time_alerts);
        setNewLaunches(data.backup_restore);
        setProductUpdate(data.audit_trails);
        setNewsletter(data.popup_alerts);
      })
      .catch(error => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <div className="container m-2">
        <div className="row justify-content-start">
          <div className="col-12 col-lg-10 col-xl-8 mx-auto">
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
              
              <div className="list-group mb-5 shadow">
                <div className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <strong className="mb-2">Enable Activity Logs</strong>
                      <p className="text-muted mb-0">Donec id elit non mi porta gravida at eget metus.</p>
                    </div>
                    <div className="col-auto">
                      <Switch onChange={handleChange} checked={checked} onHandleColor={'#fff'} onColor={'#1A35FF'} />
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
                      <Switch onChange={handleChange} checked={checked} onHandleColor={'#fff'} onColor={'#1A35FF'} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional sections can be added here */}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
