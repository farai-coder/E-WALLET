import React, { useState, useEffect } from 'react';
import { Icon } from '@mui/material';
import axios from 'axios';
import FormattedTime from './FormattedTime'; // Adjust the path as necessary
import { BASE_URL } from 'Api';

function ViewCurrentVehicles(props) {
  const [showViewVehicles, setShowViewVehicles] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/current_vehicle_in_premise`);
        setHistory(response.data.reverse());
        console.log("received history", response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHistory();
  }, []);

  // Function to calculate time difference in milliseconds
  const calculateTimeDifference = (date, time) => {
    const givenDateTimeStr = `${date} ${time}`;
    const givenDateTime = new Date(givenDateTimeStr.replace(' ', 'T') + 'Z');
    const currentDateTime = new Date();
    return currentDateTime - givenDateTime;
  };

  const filteredHistory = history.filter(vehicle =>
    vehicle.number_plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = () => {
    document.getElementById("analytics_modal").style.display = "none";
    props.setShowViewVehicles(false);
  };

  return (
    <div
      className="container"
      id="analytics_modal"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 1000,
        transform: 'translate(4%, 30%)',
        backgroundColor: 'white',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7), 0px 7px 15px rgba(0, 0, 0, 0.3)',
        padding: '30px',
        borderRadius: '10px',
        width: '650px',
        height: '400px',
        overflowY: 'auto',
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header m-2 " style={{ justifyContent: 'space-between' }}>
            <h5
              className="modal-title mt-2 mb-2 me-2 "
              id="vehiclesModalLabel"
              style={{ fontSize: '16px', color: 'grey', fontWeight: 'bold', textAlign: 'left' }}
            >
              Current Vehicle List in Premise
            </h5>
            <Icon onClick={handleClose} style={{ cursor: 'pointer', margin: '10px' }}>close</Icon>
          </div>
          <hr />
          <div className="modal-body">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by number plate"
                aria-label="Search by number plate"
                aria-describedby="basic-addon2"
                style={{ fontSize: '14px' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ fontSize: '14px' }}>Number Plate</th>
                    <th style={{ fontSize: '14px' }}>Date</th>
                    <th style={{ fontSize: '14px' }}>Time In</th>
                    <th style={{ fontSize: '14px' }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((vehicle, index) => (
                    <tr key={index}>
                      <td style={{ fontSize: '14px' }}>{vehicle.number_plate}</td>
                      <td style={{ fontSize: '14px' }}>{vehicle.date_in}</td>
                      <td style={{ fontSize: '14px' }}>{vehicle.time_in}</td>
                      <td style={{ fontSize: '14px' }}>
                        <FormattedTime time={calculateTimeDifference(vehicle.date_in, vehicle.time_in)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCurrentVehicles;
