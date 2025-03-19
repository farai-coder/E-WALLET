import React, { useState, useEffect } from "react";
import { Icon, Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import "assets/bootstrap/css/bootstrap.min.css"; // Importing the bootstrap CSS
import axios from "axios";
import { BASE_URL } from "Api";

const Entrances = () => {
  const [entrancesData, setEntrancesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/analytic/all_vehicle_history/?mode=Staff`);
        console.log("Received history:", response.data);

        // Since the response is already an array, set it directly
        if (Array.isArray(response.data)) {
          setEntrancesData(response.data); // Store the array data in state
        } else {
          console.error('Expected an array, but got:', response.data);
          setEntrancesData([]); // Fallback to an empty array if the response is not an array
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHistory();
  }, []);

  // Filter entrances data based on search term
  const filteredEntrances = entrancesData.filter(entrance =>
    entrance.number_plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine displayed entrances
  const startIndex = Math.max(filteredEntrances.length - displayCount, 0);
  const displayedEntrances = filteredEntrances.slice(startIndex).reverse();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = async (entrance) => {
    try {
      // Fetch vehicle history using number_plate when a row is clicked
      const response = await axios.get(`${BASE_URL}/history/${entrance.number_plate}`);
      setSelectedVehicle({ ...entrance, entranceHistory: response.data }); // Store the vehicle and its history
      setOpenModal(true);
    } catch (error) {
      console.error('Error fetching vehicle history:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="card shadow mt-2">
      <div className="card-header py-3">
        <p className="text-primary m-0 fw-bold fs-6">Staff History</p>
      </div>
      <div className="m-2">
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
                <th className="fs-6">Number of Entrances</th>
                <th className="fs-6">Last Entrance</th>
                <th className="fs-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedEntrances.map((entrance, index) => (
                <tr key={index}>
                  <td className="fs-6">{entrance.number_plate}</td>
                  <td className="fs-6">{entrance.number_of_visits}</td>
                  <td className="fs-6">{entrance.last_visit}</td>
                  <td>
                    <span className="p-1">
                      <Icon
                        fontSize="small"
                        className="me-2 text-dark"
                        onClick={() => handleOpenModal(entrance)}
                      >
                        visibility
                      </Icon>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong className="fs-6">Number Plate</strong></td>
                <td><strong className="fs-6">Number of Entrances</strong></td>
                <td><strong className="fs-6">Last Entrance</strong></td>
                <td><strong className="fs-6">Actions</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Modal to show vehicle details */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="vehicle-history-modal"
        aria-describedby="vehicle-history-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}>
          {selectedVehicle && (
            <>
              <Typography id="vehicle-history-modal" variant="h6" component="h2">
                Vehicle History for {selectedVehicle.number_plate}
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Date In</TableCell>
                      <TableCell>Date Out</TableCell>
                      <TableCell>Time In</TableCell>
                      <TableCell>Time Out</TableCell>
                      <TableCell>Number Plate</TableCell>
                    </TableRow>
                    {selectedVehicle.entranceHistory && selectedVehicle.entranceHistory.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.date_in}</TableCell>
                        <TableCell>{entry.date_out}</TableCell>
                        <TableCell>{entry.time_in}</TableCell>
                        <TableCell>{entry.time_out}</TableCell>
                        <TableCell>{entry.number_plate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Entrances;
