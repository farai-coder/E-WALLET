import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Modal, Box, Typography, Backdrop } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from 'Api';

function ViewVisitor(props) {
  const [visitorData, setVisitorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get_visitor/${props.id}`);
        setVisitorData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (props.id) {
      fetchVisitorData();
    }
    console.log("visitor visitor", props.id, visitorData);
  }, [props.id]);

  const handleViewClose = () => {
    props.setShowViewVisitor(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <Modal
      open={true}  // Assuming the modal is open when this component renders
      onClose={handleViewClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        style: { backgroundColor: 'transparent' }
      }}
      aria-labelledby="view-visitor-modal"
      aria-describedby="view-visitor-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        transform: 'translate(50%, -3%)',
        width: 450,
        maxHeight: '80vh', // Set maximum height
        bgcolor: 'background.paper',
        border: '1px solid #ddd',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        overflowY: 'auto', // Enable vertical scrolling
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="view-visitor-modal" variant="h6" component="h2">
            Visitor Information
          </Typography>
          <IconButton onClick={handleViewClose}>
            <Icon style={{ color: '#90cef5' }}>close</Icon>
          </IconButton>
        </div>

        <div style={{ marginTop: 16 }}>
          {visitorData && (
            <div className="contact-info-section margin-40px-tb">
              <ul className="list-style9 no-margin">
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-user text-orange me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left text-orange fs-14px" style={{ fontSize: '15px' }}>Name:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{visitorData.visitor_name}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-id-card text-yellow me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left text-yellow" style={{ fontSize: '15px' }}>ID Number:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{visitorData.national_id}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-phone-alt text-purple me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left text-purple" style={{ fontSize: '15px' }}>Phone:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{visitorData.number_plate}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-map-marker-alt text-green me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left text-green" style={{ fontSize: '15px' }}>Location:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{visitorData.address}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
}

export default ViewVisitor;
