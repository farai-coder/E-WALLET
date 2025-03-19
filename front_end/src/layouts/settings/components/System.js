import React from 'react'
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import "./Settings.css"

function System() {
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
      setChecked(event.target.checked);
    };
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  return (
    <div>
  <div className="list-group mb-5 shadow">
    <div className="list-group-item">
      <div className="row align-items-center">
        <div className="col">
          <strong className="mb-2">System Updates</strong>
          <p className="text-muted mb-0">Automatically check for and install system updates.</p>
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
          <strong className="mb-2">Backup and Restore</strong>
          <span className="badge badge-pill badge-success">Enabled</span>
          <p className="text-muted mb-0">Automatically backup system data and allow for easy restoration.</p>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary btn-sm">Disable</button>
        </div>
      </div>
    </div>
    <div className="list-group-item">
      <div className="row align-items-center">
        <div className="col">
          <strong className="mb-2">System Logs</strong>
          <p className="text-muted mb-0">View system logs to troubleshoot issues and monitor system activity.</p>
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
</div>)
}

export default System
