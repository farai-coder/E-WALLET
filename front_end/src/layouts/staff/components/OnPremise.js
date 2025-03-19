import React, { useState, useEffect } from 'react';
import { Icon } from '@mui/material';
import axios from 'axios';
import FormattedTime from 'layouts/analytics/components/FormattedTime';
import { BASE_URL } from 'Api';

function OnPremise() {
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/analytic/current_vehicle_in_premise?mode=Staff`);
        console.log("received history", response.data);

        // Access 'logs' property if it's present
        if (response.data && Array.isArray(response.data.logs)) {
          setHistory(response.data.logs); // Store the array data in state
        } else {
          console.error('logs is not an array:', response.data.logs);
        }
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

 
  // Only reverse and filter if history is an array
  const filteredHistory = Array.isArray(history) ? 
    history.reverse().filter(vehicle =>
      vehicle.number_plate.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const startIndex = Math.max(filteredHistory.length - displayCount, 0);
  const displayedHistory = filteredHistory.slice(startIndex);

  return (
    <div className="container-fluid">
      <div className="card shadow mt-2">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold fs-6">Vehicles on Premise</p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 text-nowrap">
              <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
                <label className="form-label">
                  Show&nbsp;
                  <select
                    className="d-inline-block form-select form-select-sm"
                    onChange={(e) => setDisplayCount(parseInt(e.target.value))}
                  >
                    <option value={10} selected>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  &nbsp;
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-md-end dataTables_filter" id="dataTable_filter">
                <label className="form-label">
                  <input
                    type="search"
                    className="form-control form-control-sm"
                    aria-controls="dataTable"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
            <table className="table my-0" id="dataTable">
              <thead>
                <tr>
                  <th className="fs-6">Number Plate</th>
                  <th className="fs-6">Date</th>
                  <th className="fs-6">Time In</th>
                  <th className="fs-6">Duration</th>
                </tr>
              </thead>
              <tbody>
                {displayedHistory.map((vehicle, index) => (
                  <tr key={index}>
                    <td className="fs-6">{vehicle.number_plate}</td>
                    <td className="fs-6">{vehicle.date_in}</td>
                    <td className="fs-6">{vehicle.time_in}</td>
                    <td className="fs-6">
                      <FormattedTime time={calculateTimeDifference(vehicle.date_in, vehicle.time_in)} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong className="fs-6">Number Plate</strong></td>
                  <td><strong className="fs-6">Date</strong></td>
                  <td><strong className="fs-6">Time In</strong></td>
                  <td><strong className="fs-6">Duration</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnPremise;
