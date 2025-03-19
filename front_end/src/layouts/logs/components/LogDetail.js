import React, { useEffect, useState } from "react";
import { Icon, Button, Modal, Box } from "@mui/material";
import backgroundImage from "assets/images/bg-profile.jpeg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Backdrop } from "@mui/material";
import { FaRegIdBadge, FaCalendar, FaClock, FaImage, FaCalendarAlt, FaCar } from "react-icons/fa";
import api from "Api";
import axios from "axios";
import { BASE_URL } from "Api";

function LogDetail({ log, onClose }) {
  const [filter, setFilter] = useState("");
  const [showHistory, setShowHistory] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [imageSize, setImageSize] = useState(100); // Initial image size as 100%
  const [history, setHistory] = useState(null)
  const [picture, setPicture] = useState(null)
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [originalHistory, setOriginalHistory] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      try {

        const response = await api.get(`/log_picture/${log.log_id}`);
        setPicture(response.data);
      } catch (error) {
        console.error('Error fetching picture:', error);
      }
    };

    // Make sure to declare your function as async
    async function fetchHistory(log) {
      try {
        // Await the axios request to ensure it resolves before proceeding
        const response = await axios.get(`${BASE_URL}/history/${log.number_plate}`);

        // Update state or handle response data
        setFilteredHistory(response.data);
        setOriginalHistory(response.data)

        // It's important to log after the state is updated if you're debugging
        console.log('history history', response.data, log.number_plate);
      } catch (err) {
        console.error('Error fetching history:', err);
        // Optionally handle errors here if needed
      }

      // Note: filteredHistory here will not necessarily be updated by this point
      // Log statement moved inside the try block
    }

    // Call the function with the appropriate log object
    fetchHistory(log);


    if (log.log_id) {
      fetchPictures();
    }
  }, [log.log_id]);

  if (!log) return null;

  useEffect(() => {
    if (filter && filter.trim() !== '') {
      setFilteredHistory(
        filteredHistory.filter(entry =>
          entry.date_in.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredHistory(originalHistory);
    }
  }, [filter]);

  const handleImageClick = (image) => {
    setModalImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImage(null);
  };


  const increaseSize = () => {
    setImageSize(prevSize => prevSize + 10); // Increase size by 10%
  };

  const decreaseSize = () => {
    setImageSize(prevSize => (prevSize > 10 ? prevSize - 10 : prevSize)); // Decrease size by 10%, but not below 10%
  };

  return (
    <div
      className="container"
      id="edit_modal"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: 'transparent', // Semi-transparent black overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translate(10%, 8%)',
      }}
    >
      <div className="main-body" style={{
        background: '#ffffff', // Pure white background
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19), 0 10px 30px rgba(0, 0, 0, 0.15)',
        maxWidth: '800px',
        width: '80%',
        maxHeight: '75%',
        overflowY: 'auto',
        position: 'relative',
      }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0" style={{ fontSize: '18px' }}>Log Details</h5>
          <Icon
            fontSize="small"
            className="cursor-pointer"
            onClick={onClose}
            style={{ color: '#333' }}
          >
            close
          </Icon>
        </div>
        <hr style={{
          border: '0',                    // Removes default border
          height: '3px',                  // Sets the thickness of the line
          backgroundColor: 'grey',   // Sets the color to light grey
          margin: '20px 0'                // Optional: Adds some margin to separate it from other content
        }} />
        <div className="row">
          <div className="col-md-12">
            <div style={{
              border: '3px solid lightgrey',  // Adds a border around the box
              borderRadius: '0',          // Ensures no border radius
              padding: '10px',            // Adds padding inside the box
              marginTop: '10px'           // Adds some margin to the top
            }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <p style={{ margin: '10px 0', fontSize: '14px' }}>
                    <FaCar style={{ marginRight: '10px' }} />
                    <strong>Number Plate:</strong> {log.number_plate}
                  </p>
                  <p style={{ margin: '10px 0', fontSize: '14px' }}>
                    <FaCalendarAlt style={{ marginRight: '10px' }} />
                    <strong>Date In:</strong> {log.date_in}
                  </p>
                  <p style={{ margin: '10px 0', fontSize: '14px' }}>
                    <FaCalendarAlt style={{ marginRight: '10px' }} />
                    <strong>Date Out:</strong> {log.date_out}
                  </p>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <p style={{ margin: '10px 0', fontSize: '14px' }}>
                    <FaClock style={{ marginRight: '10px' }} />
                    <strong>Time In:</strong> {log.time_in}
                  </p>
                  <p style={{ margin: '10px 0', fontSize: '14px' }}>
                    <FaClock style={{ marginRight: '10px' }} />
                    <strong>Time Out:</strong> {log.time_out}
                  </p>
                </div>
              </div>
            </div>

            <hr style={{
              border: '0',                    // Removes default border
              height: '3px',                  // Sets the thickness of the line
              backgroundColor: 'grey',   // Sets the color to light grey
              margin: '20px 0'                // Optional: Adds some margin to separate it from other content
            }} />

            <div style={{
              border: '3px solid lightgrey',  // Adds a border
              borderRadius: '0',          // Ensures no border radius
              padding: '10px',            // Adds padding inside the box
              marginTop: '10px'           // Adds some margin to the top
            }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <FaImage style={{ marginRight: '5px' }} />
                    <strong>Image In:</strong>
                  </p>
                  {picture && picture.picture_in && <img
                    src={`data:image/jpeg;base64,${picture.picture_in || backgroundImage}`}
                    alt="Image In"
                    style={{
                      width: '100%',
                      height: 'auto',
                      cursor: 'pointer',
                      borderRadius: '0',        // Removes border radius for the image
                      border: '1px solid black',// Adds a border around the image
                      maxHeight: '150px'
                    }}
                    onClick={() => handleImageClick(picture.picture_in || backgroundImage)}
                  />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <FaImage style={{ marginRight: '5px' }} />
                    <strong>Image Out:</strong>
                  </p>
                  {picture && picture.picture_out &&
                    <img
                      src={`data:image/jpeg;base64,${picture.picture_out}`}
                      alt="Image Out"
                      style={{
                        width: '100%',
                        height: 'auto',
                        cursor: 'pointer',
                        borderRadius: '0',        // Removes border radius for the image
                        border: '1px solid black',// Adds a border around the image
                        maxHeight: '150px'
                      }}
                      onClick={() => handleImageClick(picture.picture_out)}
                    />}
                </div>
              </div>
            </div>

          </div>
        </div>
        <hr style={{
          border: '0',                    // Removes default border
          height: '3px',                  // Sets the thickness of the line
          backgroundColor: 'grey',   // Sets the color to light grey
          margin: '20px 0'                // Optional: Adds some margin to separate it from other content
        }} />
        <Button
          className='text-white'
          variant="contained"
          color="primary"
          onClick={() => setShowHistory(!showHistory)}
          style={{ marginTop: '20px' }}
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </Button>
        {showHistory && (
          <div style={{ marginTop: '20px' }}>
            <h6>Access History</h6>
            <hr style={{
              border: '0',                    // Removes default border
              height: '3px',                  // Sets the thickness of the line
              backgroundColor: 'lightgrey',   // Sets the color to light grey
              margin: '20px 0',                // Optional: Adds some margin to separate it from other content

            }} />
            <TextField
              label="Filter by Date"
              variant="outlined"
              fullWidth
              margin="normal"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              autoComplete="off"
            />
            <Table striped bordered hover className="table">
              <thead>
                <tr className='fs-6'>
                  <th>Date In</th>
                  <th>Date Out</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Number Plate</th>

                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((entry, index) => (
                  <tr key={index}>
                    <td className='fs-6'>{entry.date_in}</td>
                    <td className='fs-6'>{entry.date_out}</td>
                    <td className='fs-6'>{entry.time_in}</td>
                    <td className='fs-6'>{entry.time_out}</td>
                    <td className='fs-6'>{entry.number_plate}</td>

                  </tr>
                ))}
              </tbody>
            </Table>

          </div>
        )}
      </div>
      <Modal open={openModal} onClose={handleCloseModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-30%, -10%)',
            width: '80%',
            maxWidth: '600px',
            bgcolor: 'background.paper',
            borderRadius: 8,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)', // Added shadow
            p: 2,
          }}
        >
          {modalImage && (
            <img
              src={`data:image/jpeg;base64,${modalImage}`}
              alt="Zoomed"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}

            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default LogDetail;
