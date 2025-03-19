import React from 'react'
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import "./Settings.css"
import { useState } from 'react';
function Security() {
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div>
      <div className="list-group mb-5 shadow">
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Enable Activity Logs</strong>
              <p className="text-muted mb-0">Enable logging of all user activities to track system changes.</p>
            </div>
            <div className="col-auto">
              <div className="custom-control custom-switch">
                <Switch onChange={handleChange} checked={checked} onHandleColor={'#fff'} onColor={'#1A35FF'} />
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
              <p className="text-muted mb-0">Require two-factor authentication to add an extra layer of security.</p>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary btn-sm">Disable</button>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Enable Real-Time Alerts</strong>
              <p className="text-muted mb-0">Enable notifications for critical events and system errors in real time.</p>
            </div>
            <div className="col-auto">
              <div className="custom-control custom-switch">
                <Switch onChange={handleChange} checked={checked} onHandleColor={'#fff'} onColor={'#1A35FF'} />
                <span className="custom-control-label" />
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Security
