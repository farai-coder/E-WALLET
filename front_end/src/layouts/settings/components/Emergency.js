import React from 'react';
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import "./Settings.css";
import { useState } from 'react';

function Emergency() {
  const [checked, setChecked] = useState(false);
  const [emergencySettings, setEmergencySettings] = useState({
    enableSound: false,
    autoOpen: false,
    popAlert: false,
  });

  const handleChange = (event) => {
    setEmergencySettings({
      ...emergencySettings,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <div className="list-group mb-5 shadow">
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Enable Sound</strong>
              <p className="text-muted mb-0">Enable sound alerts for emergency situations.</p>
            </div>
            <div className="col-auto">
              <div className="custom-control custom-switch">
                <Switch
                  name="enableSound"
                  checked={emergencySettings.enableSound}
                  onChange={handleChange}
                  onHandleColor={'#fff'}
                  onColor={'#1A35FF'}
                />
                <span className="custom-control-label" />
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Auto Open for Frequent Visitors</strong>
              <p className="text-muted mb-0">Auto-open the gate for frequent visitors.</p>
            </div>
            <div className="col-auto">
              <div className="custom-control custom-switch">
                <Switch
                  name="autoOpen"
                  checked={emergencySettings.autoOpen}
                  onChange={handleChange}
                  onHandleColor={'#fff'}
                  onColor={'#1A35FF'}
                />
                <span className="custom-control-label" />
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Pop Alert for Unknown Vehicles</strong>
              <p className="text-muted mb-0">Pop an alert for unknown vehicles.</p>
            </div>
            <div className="col-auto">
              <div className="custom-control custom-switch">
                <Switch
                  name="popAlert"
                  checked={emergencySettings.popAlert}
                  onChange={handleChange}
                  onHandleColor={'#fff'}
                  onColor={'#1A35FF'}
                />
                <span className="custom-control-label" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emergency;