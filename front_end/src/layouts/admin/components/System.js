import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import "./Admin.css";

function EWallet() {
  const [settings, setSettings] = useState({
    system_updates: false,
    backup_restore: false,
    system_logs: false,
    activity_logs: false,
    real_time_alerts: false,
    fa_auth: false,
    sound: false,
    popup_alerts: false,
    network_security_monitoring: false,
    data_encryption: false,
    ids: false,
    audit_trails: false,
  });

  // Define the keys to filter and maintain order
  const settingsKeys = [
    "system_updates",
    "backup_restore",
    "system_logs",
    "activity_logs",
    "real_time_alerts",
    "fa_auth",
    "sound",
    "popup_alerts",
    "network_security_monitoring",
    "data_encryption",
    "ids",
    "audit_trails",
  ];

  // Fetch settings from backend
  const fetchSettings = async () => {
    try {
      const response = await fetch("http://192.168.50.226:8000/settings/");
      const data = await response.json();
      // Find settings with id = 1
      const eWalletSettings = data.find((setting) => setting.id === 1);
      if (eWalletSettings) {
        // Filter and maintain the order of settings as per settingsKeys
        const filteredSettings = settingsKeys.reduce((acc, key) => {
          acc[key] = eWalletSettings[key] !== undefined ? eWalletSettings[key] : false; // Default to false if the key is missing
          return acc;
        }, {});

        // Set the filtered settings state
        setSettings(filteredSettings);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  // Update settings in the backend
  const updateSettings = async (updatedSettings) => {
    try {
      console.log("Updated settings: ", updatedSettings);
      await fetch("http://192.168.50.226:8000/settings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSettings),
      });
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Handle toggle change
  const handleChange = (event, setting) => {
    const newChecked = event.target.checked;
    const updatedSettings = { ...settings, [setting]: newChecked };
    console.log("Before updating state:", updatedSettings);
    setSettings(updatedSettings);
    updateSettings(updatedSettings);
  };

  return (
    <div>
      <div className="list-group mb-5 shadow">
        {/* E-Wallet Updates */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">E-Wallet Updates</strong>
              <p className="text-muted mb-0">
                Automatically check for and install updates.
              </p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "system_updates")}
                checked={settings["system_updates"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>

        {/* Backup and Restore */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Backup and Restore</strong>
              <span className="badge badge-pill badge-success">
                {settings["backup_restore"] ? "Enabled" : "Disabled"}
              </span>
              <p className="text-muted mb-0">
                Automatically backup wallet data and allow for easy restoration.
              </p>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary btn-sm">
                {settings["backup_restore"] ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        </div>

        {/* E-Wallet Logs */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">E-Wallet Logs</strong>
              <p className="text-muted mb-0">
                View logs to troubleshoot issues and monitor activity.
              </p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "system_logs")}
                checked={settings["system_logs"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Activity Logs</strong>
              <p className="text-muted mb-0">
                Monitor activity logs for transactions and changes.
              </p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "activity_logs")}
                checked={settings["activity_logs"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>

        {/* Real-Time Alerts */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Real-Time Alerts</strong>
              <p className="text-muted mb-0">Enable real-time alerts for transactions.</p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "real_time_alerts")}
                checked={settings["real_time_alerts"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Two-Factor Authentication</strong>
              <p className="text-muted mb-0">
                Enable two-factor authentication for added security.
              </p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "fa_auth")}
                checked={settings["fa_auth"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>

        {/* Sound */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Sound</strong>
              <p className="text-muted mb-0">Enable sound alerts for transactions.</p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "sound")}
                checked={settings["sound"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>

        {/* Popup Alerts */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Popup Alerts</strong>
              <p className="text-muted mb-0">Enable popup notifications for transactions.</p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "popup_alerts")}
                checked={settings["popup_alerts"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>

        {/* Network Security Monitoring */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Network Security Monitoring</strong>
              <p className="text-muted mb-0">
                Monitor network traffic for suspicious activities.
              </p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "network_security_monitoring")}
                checked={settings["network_security_monitoring"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>

        {/* Data Encryption */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Data Encryption</strong>
              <p className="text-muted mb-0">
                Enable encryption of data to protect sensitive information.
              </p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "data_encryption")}
                checked={settings["data_encryption"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>

        {/* Intrusion Detection System */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Intrusion Detection System</strong>
              <p className="text-muted mb-0">
                Enable intrusion detection to monitor unauthorized access.
              </p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "ids")}
                checked={settings["ids"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>

        {/* Audit Trails */}
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Audit Trails</strong>
              <p className="text-muted mb-0">
                Maintain a record of all actions taken within the wallet.
              </p>
            </div>
            <div className="col-auto">
              <Switch
                onChange={(e) => handleChange(e, "audit_trails")}
                checked={settings["audit_trails"]}
                onHandleColor={"#fff"}
                onColor={"#1A35FF"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EWallet;
