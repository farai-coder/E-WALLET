import React, { useState } from 'react';
import Switch from "@mui/material/Switch";
import "./Admin.css";

function Security() {
  const [settings, setSettings] = useState({
    activity_logs: false,
    fa_auth: false,
    real_time_alerts: false,
    session_timeout: false,
  });

  const handleChange = (event, setting) => {
    const newChecked = event.target.checked;
    setSettings({ ...settings, [setting]: newChecked });
  };

  return (
    <div>
      <div className="list-group mb-5 shadow">

        {/* Enable Activity Logs */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Enable Activity Logs</strong>
              <p className="text-muted mb-0">Enable logging of all user activities to track system changes.</p>
            </div>
            <div className="col-auto">
              <Switch 
                onChange={(e) => handleChange(e, 'activity_logs')} 
                checked={settings.activity_logs} 
                onHandleColor={'#fff'} 
                onColor={'#1A35FF'} 
              />
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Two-Factor Authentication</strong>
              <span className="badge badge-pill badge-success">Enabled</span>
              <p className="text-muted mb-0">Require two-factor authentication to add an extra layer of security.</p>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary btn-sm">Disable</button>
            </div>
          </div>
        </div>

        {/* Real-Time Alerts */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Enable Real-Time Alerts</strong>
              <p className="text-muted mb-0">Enable notifications for critical events and system errors in real time.</p>
            </div>
            <div className="col-auto">
              <Switch 
                onChange={(e) => handleChange(e, 'real_time_alerts')} 
                checked={settings.real_time_alerts} 
                onHandleColor={'#fff'} 
                onColor={'#1A35FF'} 
              />
            </div>
          </div>
        </div>

        {/* Enable Session Timeout */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Enable Session Timeout</strong>
              <p className="text-muted mb-0">Automatically log out users after a period of inactivity to prevent unauthorized access.</p>
            </div>
            <div className="col-auto">
              <Switch 
                onChange={(e) => handleChange(e, 'session_timeout')} 
                checked={settings.session_timeout} 
                onHandleColor={'#fff'} 
                onColor={'#1A35FF'} 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Security;
