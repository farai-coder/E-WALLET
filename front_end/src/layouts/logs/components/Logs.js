import React, { useState, useEffect } from 'react';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import jsPDF from 'jspdf';
import { NavButton as Link } from 'react-router-dom';
import { FaEye, FaLaptopHouse } from 'react-icons/fa';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';
import 'jspdf-autotable'; // Import the autotable plugin
// import TimePicker from 'react-time-picker';
// import TimePickers from './BasicTimerPicker';
import LogDetail from './LogDetail';
import axios from "axios"
import LoginModal from 'layouts/authentication/components/Login';
import { useAuth } from 'layouts/authentication/AuthContext';
import { fetchLogs } from 'Api';

// import Timer from './BasicTimerPicker';
// import "./Log.css"


function Logs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [displayCount, setDisplayCount] = useState(10);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [searchNumberPlate, setSearchNumberPlate] = useState('');
  const [searchDateStart, setSearchDateStart] = useState('');
  const [searchDateEnd, setSearchDateEnd] = useState('');
  const [searchTimeStart, setSearchTimeStart] = useState('');
  // const [searchTimeEnd, setSearchTimeEnd] = useState('');
  
  const [searchTimeEnd, setSearchTimeEnd] = useState('');
  const [closeLogDetail,setCloseLogDetail] = useState(false) 
  const [showLogDetail, setShowLogDetail] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null)
  const [filteredLogs, setFilteredLogs] = useState([]);

  // State for error messages
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const MAX_CELL_LENGTH = 32767;
  
  const [startDateError, setStartDateError] = useState('');
  const [startTimeError, setStartTimeError] = useState('')
  const [endTimeError, setEndTimeError] = useState('')
  const [startDateClass, setStartDateClass] = useState('');
  const [endDateClass, setEndDateClass] = useState('');
  const [showFiltered, setShowFiltered] = useState(false);
  const [filterOn, setFilterOn] = useState(false)

  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  

  // Open modal if user is not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    }
  }, [isAuthenticated]);

  // Handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Additional logic for when the modal closes can go here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLogs();
        setLogs(data);
      } catch (error) {
        setError('Failed to fetch logs. Please try again later.');
      }
    };

    fetchData();
  }, []);


  let displayedLogs;

  if (searchNumberPlate === '' && searchDateStart === '' && searchDateEnd === '' && searchTimeStart === '' && searchTimeEnd === ''){
    const startIndex = Math.max(logs.length - displayCount, 0);
    displayedLogs = logs.slice(0,displayCount);
 
  }

  else if(filterOn){
    displayedLogs = filteredLogs
    
  }

  
  else{
    const startIndex = Math.max(logs.length - displayCount, 0);
    displayedLogs = logs.slice(0,displayCount);

  }

  const jsontopdf = () => {
    try {
      const doc = new jsPDF();
  
      doc.autoTable({
        head: [['ID', 'Number Plate', 'Date In', 'Date Out', 'Time In', 'Time Out']],
        body: displayedLogs.map(log => [
          log.log_id,
          log.number_plate,
          log.date_in,
          log.date_out,
          log.time_in,
          log.time_out
        ]),
        startY: 30,
        margin: { horizontal: 10 },
        styles: { fontSize: 10, cellPadding: 4, valign: 'middle', halign: 'center' },
        headStyles: { fillColor: [22, 160, 133] },
        theme: 'striped'
      });
  
      doc.save('logs.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  

  const jsontoexcel = () => {
    const trimmedLogs = displayedLogs.map(log => {
      const trimmedLog = {};
      for (const key in log) {
        if (log[key] && typeof log[key] === 'string' && log[key].length > MAX_CELL_LENGTH) {
          trimmedLog[key] = log[key].substring(0, MAX_CELL_LENGTH);
        } else {
          trimmedLog[key] = log[key];
        }
      }
      return trimmedLog;
    });
  
    const worksheet = XLSX.utils.json_to_sheet(trimmedLogs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');
    XLSX.writeFile(workbook, 'logs.xlsx');
  };

  const jsontotxt = () => {
    let txtContent = '';
    displayedLogs.forEach(function (Vehicle) {
      txtContent +=
        'id : ' +
        Vehicle.log_id +
        ' number plate :  ' +
        Vehicle.number_plate +
        ' date in  :  ' +
        Vehicle.date_in +
        ' date out  :  ' +
        Vehicle.date_out +
        ' time in  :  ' +
        Vehicle.time_in +
        ' time out  :  ' +
        Vehicle.time_out +
        '\n';
    });
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'logs.txt');
  };

  const handleDownload = () => {
    if (downloadFormat === 'pdf') {
      jsontopdf();
    } else if (downloadFormat === 'excel') {
      jsontoexcel();
    } else if (downloadFormat === 'text') {
      jsontotxt();
    }
  };
 
  const handleViewClick = (log) => {
    console.log('log', log)
    setSelectedLog(log);
    setShowLogDetail(true);
  };

  const handleCloseLogDetail = () => {
    setShowLogDetail(false);
    setSelectedLog(null);
  };

  const handleStartDateChange = (e) => {
    setSearchDateStart(e.target.value);
    if (searchDateEnd && !e.target.value) {
      setStartDateError(true);
    } else {
      setStartDateError('');
    }
  };
  
  const handleEndDateChange = (e) => {
    setSearchDateEnd(e.target.value);
    if (e.target.value && !searchDateStart) {
      setStartDateError(true);
    } else {
      setStartDateError('');
    }
  };
    

    const handleStartTimeChange = (e) => {
      setSearchTimeStart(e.target.value);
      
      if (searchTimeEnd && e.target.value > searchTimeEnd) {
        setStartTimeError('');
      } else {
        setStartTimeError('');
      }
    };
  
    const handleEndTimeChange = (e) => {
      setSearchTimeEnd(e.target.value);
  
      if (e.target.value && (!searchTimeStart || searchTimeStart > e.target.value)) {
        setStartTimeError(true);
      } else {
        setStartTimeError('');
      }
    };

      // Filter logs based on search criteria
  const filterLogs = () => {
    return logs.filter(log => {
      // Filter by Number Plate (partial match and case-insensitive)
      if (searchNumberPlate && !log.number_plate.toLowerCase().includes(searchNumberPlate.toLowerCase())) {
        return false;
      }

      // Filter by Start Date
      const logDateInISO = new Date(log.date_in).toISOString().split('T')[0];
      if (searchDateStart) {
        const searchDateStartISO = new Date(searchDateStart).toISOString().split('T')[0];
        if (logDateInISO !== searchDateStartISO) {
          return false;
        }
      }

      // Filter by End Date
      const logDateOutISO = new Date(log.date_out).toISOString().split('T')[0];
      if (searchDateEnd) {
        const searchDateEndISO = new Date(searchDateEnd).toISOString().split('T')[0];
        if (logDateOutISO !== searchDateEndISO) {
          return false;
        }
      }
      
     // Extract log date and time
      const logDate = log.date_in;
      const logTime = log.time_in;

      // Create ISO strings for comparison
      const logISO = `${logDate}T${logTime}`;
      const startISO = `${searchDateStart}T${searchTimeStart}`;

      // Create an end time ISO string if searchTimeEnd is provided
      const endISO = searchDateEnd
        ? `${searchDateEnd}T${searchTimeEnd}`
        : `${searchDateStart}T23:59:59`;

      // Assume initially that the log is within range
      let withinRange = true;

      if (searchDateStart && searchTimeStart) {
        // Check if the log date matches the search start date
        if (logDate !== searchDateStart) {
          return false; // Log date does not match search start date
        }

        // Check if the log time is within the specified time range
        if (logISO < startISO || logISO > endISO) {
          return false; // Log time is not within the specified range
        }
      }


      // // 5. Filter by , start time, End Time if provided and Date in is selected
      
     // Extract log date and time
      const logDate1 = log.date_in;
      const logTime1 = log.time_in;

      // Create ISO strings for comparison
      const logISO1 = `${logDate1}T${logTime1}`;
      const startISO1 = `${searchDateStart}T${searchTimeStart}`;

      // Create endISO string based on searchTimeEnd or default to end of the day
      const endISO1 = searchTimeEnd ? `${searchDateStart}T${searchTimeEnd}` : `${searchDateStart}T23:59:59`;

      // Assume initially that the log is within range
      let withinRange1 = true;

      if (searchDateStart && searchTimeStart) {
        // Check if the log date matches the search start date
        if (logDate1 !== searchDateStart) {
          return false; // Log date does not match search start date
        }

        // Check if the log time is within the specified time range
        if (logISO1 < startISO1 || logISO1 > endISO1) {
          return false; // Log time is not within the specified range
        }
      }

      // // Filter by Start Time and End Time
      const logISO2 = `${log.date_in}T${log.time_in}`;
      const startISO2 = `${searchDateStart}T${searchTimeStart}`;
      const endISO2 = searchTimeEnd ? `${searchDateStart}T${searchTimeEnd}` : `${searchDateStart}T23:59`;

      if (searchDateStart && searchTimeStart) {
        if (logISO2 < startISO2 || logISO2 > endISO2) {
          return false;
        }
      }
      // Extract log out date and time out
      const logDateOut = log.date_out;
      const logTimeOut = log.time_out;
    
      // Check if the log's date out matches the search end date
      const isDateMatching = logDateOut === searchDateEnd;

      // Check if the log's time out is within the specified time range (start time to midnight)
      const isTimeInRange = logTimeOut >= searchTimeStart && logTimeOut <= '23:59';

      if (searchDateEnd && searchTimeStart) {
        if (!isDateMatching) {

          return false; // Log's date out does not match search end date
        }

        if (!isTimeInRange) {
      
          return false; // Log's time out is not within the time range
        }
      }
      // Extract log out date, start time and end time
      const logDateOut1 = log.date_out;
      const logTimeOut1 = log.time_out;

      // Check if the log's date out matches the search end date
      const isDateMatching1 = logDateOut1 === searchDateEnd;

      // Check if the log's time out is within the specified time range (start time to end time)
      const isTimeInRange1 = logTimeOut1 >= searchTimeStart && logTimeOut1 <= searchTimeEnd;

      if (searchDateEnd && searchTimeStart && searchTimeEnd) {
        if (!isDateMatching1) {
          return false; // Log's date out does not match search end date
        }

        if (!isTimeInRange1) {
          return false; // Log's time out is not within the time range
        }
      }

      return true;
    });
  };

  // Handle search logic and state updates
  const handleSearch = () => {

    const filter = filterLogs();
    setFilteredLogs(filter);
    setFilterOn(true)

    // Check if time is selected but no date is selected
    const isTimeSelected = searchTimeStart || searchTimeEnd;
    const isDateStartSelected = !!searchDateStart;
    const isDateEndSelected = !!searchDateEnd;

    if (isTimeSelected && (!isDateStartSelected || !isDateEndSelected)) {
      setStartDateClass('border-danger');
      setEndDateClass('border-danger');
      return;
    }

    // Reset the border if dates are selected
    setStartDateClass('');
    setEndDateClass('');

    // Show or hide filtered logs
    if (filter.length > 0) {
      setShowFiltered(true); // Show the modal or any UI component for filtered logs
    } else {
      setShowFiltered(false); // Hide the modal or component if no logs are found
    }
   
  };

  const onClose = () => {
    setShowFiltered(false);
}
  
  return (
    <DashboardLayout>
      <LoginModal open={isModalOpen} onClose={handleModalClose} />

      <DashboardNavbar />
      {showLogDetail && <LogDetail onClose={handleCloseLogDetail} log={selectedLog} />}
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <div className="container-fluid">
            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold ">Logs Info</p>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label className="form-label fs-6 fs-6">Number Plate</label>
                    <input
                      type="text"
                      className="form-control"
                      
                      onChange={(e) => setSearchNumberPlate(e.target.value)}
                      value={searchNumberPlate}
                    />
                  </div>
                  <div className="col-md-2">
                      <label className="form-label fs-6">Date In</label>
                      <input
                        type="date"
                        className={`form-control  p-2 `}
                        value={searchDateStart}
                        onChange={handleStartDateChange}
                      />
                      {false && <div className="text-danger">{startDateError}</div>}
                    </div>
                    <div className="col-md-2">
                      <label className="form-label fs-6">Date Out</label>
                      <input
                        type="date"
                        className={`form-control p-2`}
                        value={searchDateEnd}
                        onChange={handleEndDateChange}
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label fs-6">Time Start</label>
                      <input
                        type="time"
                        className={`form-control fs-6`}
                        value={searchTimeStart}
                        onChange={handleStartTimeChange}
                      />
                    </div>
                    
                    <div className="col-md-2">
                      <label className="form-label fs-6">Time End</label>
                      <input
                        type="time"
                        className="form-control fs-6"
                        value={searchTimeEnd}
                        onChange={handleEndTimeChange}
                      />
                    </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button
                      onClick={handleSearch}
                      className="btn btn-primary w-100"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 text-nowrap">
                    <div
                      id="dataTable_length"
                      className="dataTables_length"
                      aria-controls="dataTable"
                    >
                      <label className="form-label fs-5">
                        Show:&nbsp;
                        <select
                          className="d-inline-block form-select form-select-sm"
                          value={displayCount}
                          onChange={(e) => setDisplayCount(parseInt(e.target.value))}
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="500">500</option>
                        </select>
                        &nbsp;
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className="table-responsive table mt-2"
                  id="dataTable"
                  role="grid"
                  aria-describedby="dataTable_info"
                >
                  <table className="table my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th className='fs-6'>ID</th>
                        <th className='fs-6'>Number Plate</th>
                        <th className='fs-6'>Date In</th>
                        <th className='fs-6'>Date Out</th>
                        <th className='fs-6'>Time In</th>
                        <th className='fs-6'>Time Out</th>
                        <th className='fs-6'>Class</th>
                        <th className='fs-6'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedLogs.slice(0, displayCount).map((Log, index) => (
                        <tr key={Log.log_id}>
                          <td className='fs-6'>{index + 1}</td>
                          <td className='fs-6'>{Log.number_plate}</td>
                          <td className='fs-6'>{Log.date_in}</td>
                          <td className='fs-6'>{Log.date_out}</td>
                          <td className='fs-6'>{Log.time_in}</td>
                          <td className='fs-6'>{Log.time_out}</td>
                          <td className='fs-6'>{Log.entry_type}</td>
                          <button
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                          }}
                           onClick={() => handleViewClick(Log)} className="icon-button m-1">
                            <FaEye className="myreact-icons text-dark" />
                          </button>
                        </tr>
                      ))}
                    </tbody>
                      <tfoot>
                        <div className="d-flex align-items-center">
                          <select
                            className="form-select form-select-sm me-2"
                            value={downloadFormat}
                            onChange={(e) => setDownloadFormat(e.target.value)}
                          >
                            <option value="pdf">PDF</option>
                            <option value="excel">Excel</option>
                            <option value="text">Text</option>
                          </select>
                          <button
                            onClick={handleDownload}
                            type="button"
                            className="btn btn-primary btn-sm w-100"
                            style={{ backgroundColor: '#007bff', borderColor: '#007bff' }} // Ensure blue color
                          >
                            Download
                          </button>
                        </div>
                      </tfoot>

                  </table>
                </div>
                <div className="row">
                  <div className="col-md-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* {showFiltered && filteredLogs.length > 0 && ( */}
      {false && filteredLogs.length > 0 && (
        <div
        className=""
       
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'translate(10%, 10%)',
          display: 'flex',
          alignItems: 'flex-start',
          backgroundColor: 'transparent',
          justifyContent: 'center',
          overflowY: 'auto', // Make the overlay scrollable if content overflows
          zIndex: 1000,
    
        }}
      >
        <div
          className="modal-content"
          onClick={e => e.stopPropagation()}
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0,0,20,0.7)',
            width: '650px',
            maxHeight: '80vh', // Limit height and make it scrollable if content overflows
           
            transform: 'translate(5%, 10%)' // Adjust transform for better centering
          }}
        >
          <h4 className='ms-2' style={{ marginTop: '0' }}>Logs Filtered</h4>
          <hr />
          <button
            className="close-button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#000'
            }}
          >
            &times;
          </button>
          <div className="tab-content">
            <div className="tab-pane active" id="home">
              <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className='fs-6'>#</th>
                      <th className='fs-6'>Number Plate</th>
                      <th className='fs-6'>Date In</th>
                      <th className='fs-6'>Date Out</th>
                      <th className='fs-6'>Time In</th>
                      <th className='fs-6'>Time Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log) => (
                      <tr key={log.v_id}>
                        <td className='fs-6'>{log.log_id}</td>
                        <td className='fs-6'>{log.number_plate}</td>
                        <td className='fs-6'>{log.date_in}</td>
                        <td className='fs-6'>{log.date_out}</td>
                        <td className='fs-6'>{log.time_in}</td>
                        <td className='fs-6'>{log.time_out}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                <div className="row">
                  <div className="col-md-4 col-md-offset-4 text-center">
                    <ul className="pagination" id="myPager"></ul>
                  </div>
                </div>
              </div>
              {/*/table-resp*/}
              <hr />
            </div>
          </div>
        </div>
      </div>
      )}
    </DashboardLayout>
  );
}

export default Logs;

