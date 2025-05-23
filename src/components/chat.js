import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [jobId, setJobId] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [proposalId, setProposalId] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(null); 
  const navigate = useNavigate();

  const loggedInUserId = JSON.parse(localStorage.getItem('profile'))?._id;

  useEffect(() => {
    if (!loggedInUserId) {
      setError('Employer not found. Please log in.');
      setLoading(false);
      return;
    }

    const fetchProposals = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/job-offers/proposals/${loggedInUserId}`);
        setProposals(response.data.offers);
        setLoading(false);
      } catch (err) {
        setError('Error fetching proposals.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProposals();
  }, [loggedInUserId]);

  // Get messages for the selected candidate
  const getCandidateMessages = async (selectedJobId, candidateId, proposalId) => {
    setJobId(selectedJobId);
    setSenderId(loggedInUserId);
    setProposalId(proposalId);
    setReceiverId(candidateId);

    try {
      const response = await axios.get(`http://localhost:5000/api/chat/${selectedJobId}/${candidateId}/${loggedInUserId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const messageData = {
          jobId,
          senderId,
          receiverId,
          proposalId,  
          message: newMessage,
        };

        const res = await axios.post('http://localhost:5000/api/chat', messageData);
        setMessages([...messages, res.data]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const updateStatus = async (chatId, status) => {
    try {
      await axios.put('http://localhost:5000/api/chat/update-status', {
        chatId: chatId, 
        status: 'approved'
      });
      alert(`Status updated to ${status}`);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleOptions = (userId) => {
    setShowOptions((prev) => (prev === userId ? null : userId)); 
  };

  return (
    <div className="container d-flex">
      <div className="sidebar" style={{ width: '300px', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
        <h3>Applicants</h3>
        {loading && <p>Loading proposals...</p>}
        {error && <p className="text-danger">{error}</p>}
        {proposals.length === 0 && !loading && <p>No proposals yet.</p>}

        <div className="list-group">
          {proposals.map((proposal) => (
            <div key={proposal._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => getCandidateMessages(proposal.jobId._id, proposal.userId._id, proposal._id)}>
                <img
                  src={proposal.userId.profilePic || 'default-profile-pic.jpg'}
                  alt="Profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                />
                <span>{proposal.userId.firstName} {proposal.userId.lastName}</span>
              </div>
              <div>
                <small>{proposal.userId.email || 'No email available'}</small>  {/* Show email */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-container" style={{ flexGrow: 1, paddingLeft: '20px' }}>
        {jobId && senderId && receiverId && (
          <>
            <h3>Chat with Applicant</h3>
            <div className="messages" style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1rem' }}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: msg.senderId === loggedInUserId ? 'right' : 'left',
                    marginBottom: '10px',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: msg.senderId === loggedInUserId ? '#dcf8c6' : '#f1f0f0',
                      padding: '8px 12px',
                      borderRadius: '15px',
                      maxWidth: '75%',
                    }}
                  >
                    <p style={{ margin: 0 }}>{msg.message}</p>
                    <small style={{ display: 'block', fontSize: '10px', marginTop: '4px' }}>
                      {new Date(msg.sentAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>

            <div className="message-input d-flex">
              <textarea
                className="form-control me-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={2}
              />
              <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobProposals;
