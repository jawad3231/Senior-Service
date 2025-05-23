import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Messages = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("inbox");
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    fetchMessages();
  }, [activeTab]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/${activeTab}/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post("/api/messages", { senderId: userId, receiverId, message: newMessage });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const archiveMessage = async (messageId) => {
    try {
      await axios.put(`/api/messages/archive/${messageId}`);
      fetchMessages();
    } catch (error) {
      console.error("Error archiving message:", error);
    }
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "inbox" ? "active" : ""}`} onClick={() => setActiveTab("inbox")}>Inbox</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "sent" ? "active" : ""}`} onClick={() => setActiveTab("sent")}>Sent</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "unanswered" ? "active" : ""}`} onClick={() => setActiveTab("unanswered")}>Unanswered</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "archived" ? "active" : ""}`} onClick={() => setActiveTab("archived")}>Archived</button>
        </li>
      </ul>

      <div className="mt-3">
        {messages.map((msg) => (
          <div key={msg._id} className="card mb-2">
            <div className="card-body">
              <h6 className="card-title">From: {msg.senderId}</h6>
              <p className="card-text">{msg.message}</p>
              <button className="btn btn-danger btn-sm" onClick={() => archiveMessage(msg._id)}>Archive</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input className="form-control mb-2" placeholder="Receiver ID" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />
        <input className="form-control mb-2" placeholder="Type a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button className="btn btn-primary" onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default Messages;