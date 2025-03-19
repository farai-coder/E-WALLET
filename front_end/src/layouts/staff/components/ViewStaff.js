import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Modal, Box, Typography, Backdrop } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from 'Api';

function ViewStaff(props) {
  const [staffData, setStaffData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get_staff/${props.id}`);
        setStaffData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (props.id) {
      fetchStaffData();
    }
    console.log("staff staff", props.id, staffData)
  }, [props.id]);

  const handleViewClose = () => {
    props.setShowViewStaff(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <Modal
      open={true} // Assuming the modal is open when this component renders
      onClose={handleViewClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        style: { backgroundColor: 'transparent' }
      }}
      aria-labelledby="view-staff-modal"
      aria-describedby="view-staff-description"
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
          <Typography id="view-staff-modal" variant="h6" component="h2">
            Staff Information
          </Typography>
          <IconButton onClick={handleViewClose}>
            <Icon style={{ color: '#90cef5' }}>close</Icon>
          </IconButton>
        </div>

        <div style={{ marginTop: 16 }}>
          {staffData && (
            <div className="contact-info-section margin-40px-tb">
              <ul className="list-style9 no-margin">
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-user text-orange me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left text-orange fs-14px" style={{ fontSize: '15px' }}>Name:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{staffData.name}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-id-card text-yellow me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left text-yellow" style={{ fontSize: '15px' }}>National Id:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{staffData.national_id}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="far fa-file text-lightred me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left text-lightred" style={{ fontSize: '15px' }}>Department:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{staffData.department}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-map-marker-alt text-green me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left text-green" style={{ fontSize: '15px' }}>Address:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{staffData.address}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-mobile-alt text-purple me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left xs-margin-four-left text-purple" style={{ fontSize: '15px' }}>Phone:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{staffData.phone}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-envelope text-pink me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left xs-margin-four-left text-pink" style={{ fontSize: '15px' }}>Email:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}><a href={`mailto:${staffData.email}`}>{staffData.email}</a></p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="far fa-calendar-alt text-pink me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left xs-margin-four-left text-orange" style={{ fontSize: '15px' }}>Start Date:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{staffData.start_date}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-md-5 col-5">
                      <i className="fas fa-car-alt me-2" style={{ fontSize: '15px' }} />
                      <strong className="margin-10px-left xs-margin-four-left text-brown" style={{ fontSize: '15px' }}>Vehicles Owned:</strong>
                    </div>
                    <div className="col-md-7 col-7">
                      <p style={{ fontSize: '15px' }}>{staffData.number_plate}</p>
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

export default ViewStaff;
