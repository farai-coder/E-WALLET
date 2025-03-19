import React, { useState, useEffect, useRef } from 'react';
import mqtt from "mqtt";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { BASE_URL } from 'Api';
import Icon from '@mui/material/Icon';
import Vehicles from './vehicles';
import { CarRental, LockOpen, LabelImportant, Https, DepartureBoard } from '@mui/icons-material'; 
import { useAuth } from 'layouts/authentication/AuthContext';
import LoginModal from 'layouts/authentication/components/Login';

const LiveView = () => {
  const [selectedStream, setSelectedStream] = useState('stream'); // Default stream
  const [isPlayingStream1, setIsPlayingStream1] = useState(true); // Stream 1 play state
  const [isPlayingStream2, setIsPlayingStream2] = useState(true); // Stream 2 play state
  const [lastFrame, setLastFrame] = useState(''); // Stores the last frame when paused
  const [numberPlate, setNumberPlate] = useState(""); // Sample number plate
  const [plateClass, setPlateClass] = useState(""); // Sample plate class
  const [permission, setPermission] = useState("")
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef();

  const streamURL = `${BASE_URL}/${selectedStream}`;
  const streamURL2 = `${BASE_URL}/stream2`;

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
    // Connect to the MQTT broker
    const mqttClient = mqtt.connect('ws://192.168.50.226:9001/mqtt');
    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("Connected to the MQTT broker");
      setIsConnected(true);

      // Subscribe to the plate/value topic after connection
      mqttClient.subscribe('plate/value', { qos: 2 }, (err) => {
        if (err) {
          console.error("Subscribe error:", err);
        } else {
          console.log('Successfully subscribed to plate/value topic');
        }
      });
    });

    mqttClient.on("error", (err) => {
      console.error("Connection error:", err);
    });

    mqttClient.on("message", (topic, payload) => {
      if (topic === "plate/value") {
        const data = JSON.parse(payload.toString());
        setNumberPlate(data.number_plate);  // Update number plate
        setPlateClass(data.class);           // Update plate class
        setPermission(data.permission);
        setReceivedMessages((prev) => [...prev, data]);  // Store all received messages if needed
        console.log("Received message:", data);
      }
    });

    // Cleanup on component unmount
    return () => {
      if (mqttClient) {
        mqttClient.end();
        console.log("Disconnected from MQTT broker");
      }
    };
  }, []);  // Empty dependency array mean
  
  const handleStreamChange = (event) => {
    setSelectedStream(event.target.value);
    setIsPlayingStream1(true); // Reset to play when changing streams
    setIsPlayingStream2(true); // Reset to play when changing streams
    setLastFrame(''); // Reset last frame when switching streams
  };

  const handlePlayStream1 = () => {
    setIsPlayingStream1(true);
  };

  const handlePauseStream1 = () => {
    setIsPlayingStream1(false);
    setLastFrame(streamURL); // Save the current frame as the last frame
  };

  const handlePlayStream2 = () => {
    setIsPlayingStream2(true);
  };

  const handlePauseStream2 = () => {
    setIsPlayingStream2(false);
    setLastFrame(streamURL2); // Save the current frame as the last frame
  };

  const handleError = () => {
    setLastFrame(''); // Clear the frame if an error occurs
  };

  // MQTT Setup
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [topic, setTopic] = useState("relay/control");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // Connect to the MQTT broker
    const mqttClient = mqtt.connect('ws:192.168.50.226:9001/mqtt');
    setClient(mqttClient);

    mqttClient.on("connect", () => {
      setIsConnected(true);
    });

    mqttClient.on("error", (err) => {
      console.error("Connection error:", err);
    });

    mqttClient.on("message", (topic, payload) => {
      setReceivedMessages((prev) => [...prev, payload.toString()]);
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  const handleSubscribe = () => {
    if (client && isConnected) {
      client.subscribe(topic, (err) => {
        if (err) {
          console.error("Subscribe error:", err);
        } else {
          console.log(`Subscribed to topic "${topic}"`);
        }
      });
    }
  };

  const handlePublish = (state) => {
    if (client && isConnected) {
      client.publish(topic, state, { qos: 2 }, (err) => {
        if (err) {
          console.error("Publish error:", err);
        } else {
          console.log(`Message published to topic "${topic}":`, state);
        }
      });
    }
  };

  return (
    <DashboardLayout>
      <LoginModal open={isModalOpen} onClose={handleModalClose} />
      <DashboardNavbar />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '20px', marginTop: '20px' }}>
        
        {/* Video Streams Section */}
        <div style={{ flex: 0.6, display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          
          {/* First Stream */}
          <div style={{ width: '100%', maxHeight: '450px', position: 'relative' }}>
            <img
              src={isPlayingStream1 ? streamURL : lastFrame}
              alt="Live Stream"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              ref={videoRef}
              onError={handleError}
            />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}>
              Stream 1
            </div>
          </div>

          {/* Play and Pause Buttons for Stream 1 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button
              onClick={handlePlayStream1}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: isPlayingStream1 ? '#ccc' : '#00bcd4',
                fontSize: '24px',
              }}
            >
              <Icon>play_circle</Icon>
            </button>
            <button
              onClick={handlePauseStream1}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: !isPlayingStream1 ? '#ccc' : '#f44336',
                fontSize: '24px',
              }}
            >
              <Icon>pause_circle</Icon>
            </button>
          </div>

          {/* Second Stream */}
          <div style={{ width: '100%', maxHeight: '450px', position: 'relative' }}>
            <img
              src={isPlayingStream2 ? streamURL2 : lastFrame}
              alt="Live Stream"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              ref={videoRef}
              onError={handleError}
            />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}>
              Stream 2
            </div>
          </div>

          {/* Play and Pause Buttons for Stream 2 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button
              onClick={handlePlayStream2}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: isPlayingStream2 ? '#ccc' : '#00bcd4',
                fontSize: '24px',
              }}
            >
              <Icon>play_circle</Icon>
            </button>
            <button
              onClick={handlePauseStream2}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: !isPlayingStream2 ? '#ccc' : '#f44336',
                fontSize: '24px',
              }}
            >
              <Icon>pause_circle</Icon>
            </button>
          </div>

        </div>

     {/* Boom Gate Control Section */}
<div style={{
  flex: 0.35,
  padding: '30px',
  border: '1px solid #ddd',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  
  gap: '30px',
  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
}} className='m-3'>
  
  {/* Title */}
  <h5 className="text-center mb-4" style={{
    color: '#333',
    fontSize: '24px',
    fontWeight: '500',
    letterSpacing: '0.5px',
  }}>Boom Gate Control</h5>
  
  {/* Open and Close Buttons */}
  <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
    <button
      onClick={() => handlePublish("u")}
      className="btn btn-success rounded d-block mx-auto mb-3"
      style={{
        width: '160px',
        height: '50px',
        fontSize: '18px',
        transition: 'all 0.3s ease',
        boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '12px',
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    >
      <LockOpen style={{ marginRight: '8px' }} /> Open
    </button>

    <button
      onClick={() => handlePublish("d")}
      className="btn btn-danger rounded d-block mx-auto mb-3"
      style={{
        width: '160px',
        height: '50px',
        fontSize: '18px',
        transition: 'all 0.3s ease',
        boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '12px',
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    >
      <Https style={{ marginRight: '8px' }} /> Close
    </button>
  </div>

 {/* Number Plate Information Section */}
<div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '30px',
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
  marginTop: '20px',
  width: '100%',
  maxWidth: '450px',
  margin: 'auto',
}}>
  <h6 style={{
    fontSize: '22px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  }}>
    <DepartureBoard style={{ fontSize: '26px', color: '#4caf50' }} />
    Number Plate Information
  </h6>
  <div style={{
    fontSize: '18px',
    color: '#555',
    fontWeight: '500',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    width: '100%',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <LabelImportant style={{ color: '#333', fontSize: '20px' }} />
      <strong style={{ color: '#444' }}>Plate Number:</strong>
      <span style={{ color: '#333', fontWeight: '500' }}>{numberPlate || "No Vehicle"}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <LabelImportant style={{ color: '#333', fontSize: '20px' }} />
      <strong style={{ color: '#444' }}>Plate Class:</strong>
      <span style={{ color: '#333', fontWeight: '500' }}>{plateClass || "No Vehicle"}</span>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <LabelImportant style={{ color: '#333', fontSize: '20px' }} />
      <strong style={{ color: '#444' }}>Access:</strong>
      <span style={{ color: '#333', fontWeight: '500' }}>{permission || "No Vehicle"}</span>
    </div>
  </div>
</div>

  {/* Vehicles Component */}
  <div style={{
    width: '100%',
    marginTop: '25px',
    borderTop: '1px solid #ddd',
    paddingTop: '25px',
    paddingBottom: '10px',
  }}>
    <Vehicles />
  </div>

</div>


      </div>
    </DashboardLayout>
  );
};

export default LiveView;
