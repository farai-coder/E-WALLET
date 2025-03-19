import React, { useEffect, useState } from "react";
import { Icon, Button, Modal, Box, Backdrop } from "@mui/material";
import backgroundImage from "assets/images/bg-profile.jpeg";
import { FaCar, FaCalendarAlt, FaClock, FaImage } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "Api";
import * as XLSX from 'xlsx';

function AnomalyDetail({ log, onClose }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/log_picture/${log.log_id}`);
        setPicture(response.data);
      } catch (error) {
        console.error('Error fetching picture:', error);
      }
    };

    if (log.log_id) {
      fetchPictures();
    }
  }, [log.log_id]);

  // Function to handle the image modal open
  const handleImageClick = (image) => {
    setModalImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImage(null);
  };

  // Function to export the log data to Excel
  const handleExport = () => {
    const logData = [
      {
        'Number Plate': log.number_plate,
        'Date In': log.date_in,
        'Date Out': log.date_out,
        'Time In': log.time_in,
        'Time Out': log.time_out,
      },
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(logData);
    XLSX.utils.book_append_sheet(wb, ws, 'Log Details');
    XLSX.writeFile(wb, 'log_details.xlsx');
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
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translate(10%, 3%)',
      }}
    >
        
      <div
        className="main-body"
        style={{
          background: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19), 0 10px 30px rgba(0, 0, 0, 0.15)',
          maxWidth: '800px',
          width: '80%',
          maxHeight: '75%',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0" style={{ fontSize: '18px' }}>Anomaly Details</h5>
          <Icon
            fontSize="small"
            className="cursor-pointer"
            onClick={onClose}
            style={{ color: '#333' }}
          >
            close
          </Icon>
        </div>

        <hr
          style={{
            border: '0',
            height: '3px',
            backgroundColor: 'grey',
            margin: '20px 0',
          }}
        />

        <div className="row">
          <div className="col-md-12">
            <div
              style={{
                border: '3px solid lightgrey',
                borderRadius: '0',
                padding: '10px',
                marginTop: '10px',
              }}
            >
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: '1 1 200px' }}>
                  
                  <p style={{ margin: '10px 0', fontSize: '14px' }}>
                    <FaCalendarAlt style={{ marginRight: '10px' }} />
                    <strong>Date In:</strong> {log.date_in}
                  </p>
                 
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <p style={{ margin: '10px 0', fontSize: '14px' }}>
                    <FaClock style={{ marginRight: '10px' }} />
                    <strong>Time In:</strong> {log.time_in}
                  </p>
                  
                </div>
              </div>
            </div>

            <hr
              style={{
                border: '0',
                height: '3px',
                backgroundColor: 'grey',
                margin: '20px 0',
              }}
            />

            <div
              style={{
                border: '3px solid lightgrey',
                borderRadius: '0',
                padding: '10px',
                marginTop: '10px',
              }}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <FaImage style={{ marginRight: '5px' }} />
                    <strong>Image In:</strong>
                  </p>
                  {picture && picture.picture_in && (
                    <img
                      src={`data:image/jpeg;base64,${picture.picture_in || backgroundImage}`}
                      alt="Image In"
                      style={{
                        width: '100%',
                        height: 'auto',
                        cursor: 'pointer',
                        borderRadius: '0',
                        border: '1px solid black',
                        maxHeight: '300px',
                      }}
                      onClick={() => handleImageClick(picture.picture_in || backgroundImage)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for showing images using the given template */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'transparent' },
        }}
      >
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
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
            p: 2,
          }}
        >
          {modalImage && (
            <img
              src={`data:image/jpeg;base64,${modalImage}`}
              alt="Zoomed"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default AnomalyDetail;
