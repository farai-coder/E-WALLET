import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const MqttComponent = () => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [topic, setTopic] = useState("relay/control");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // Connect to the MQTT broker
    const mqttClient = mqtt.connect('ws:192.168.50.226:9001/mqtt'); // Use the correct protocol (ws or mqtt)
    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      setIsConnected(true);
    });

    mqttClient.on("error", (err) => {
      console.error("Connection error:", err);
    });

    mqttClient.on("message", (topic, payload) => {
      console.log(`Message received on topic "${topic}":`, payload.toString());
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
      client.publish(topic, state, (err) => {
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
      <DashboardNavbar />
      <div style={{ padding: "20px", border: "1px solid lightgrey" }}>
        <h2>MQTT React Component</h2>
        <div>
          <label>
            Topic:
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ marginLeft: "10px", marginBottom: "10px" }}
            />
          </label>
        </div>
        <div>
          <button onClick={handleSubscribe} style={{ marginRight: "10px" }}>
            Subscribe
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => handlePublish("HIGH")} style={{ marginRight: "10px" }}>
            Open Boom Gate
          </button>
          <button onClick={() => handlePublish("No_Presence")}>
            Close Boom Gate
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3>Received Messages:</h3>
          <ul>
            {receivedMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MqttComponent;
