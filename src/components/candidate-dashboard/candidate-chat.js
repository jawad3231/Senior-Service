// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CandidateChat = () => {
//   const [proposals, setProposals] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [selectedProposal, setSelectedProposal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const loggedInCandidateId = JSON.parse(localStorage.getItem('profile'))?._id;

//   useEffect(() => {
//     if (!loggedInCandidateId) {
//       setError('Profile not found. Please log in.');
//       setLoading(false);
//       return;
//     }

//     const fetchProposals = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/job-offers/candidate-proposals/${loggedInCandidateId}`
//         );
//         if (response.data?.success && response.data.proposals) {
//           setProposals(response.data.proposals);
//         } else {
//           setProposals([]);
//         }
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching proposals.');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchProposals();
//   }, [loggedInCandidateId]);

//   // Load messages using proposalId
//   // const getMessages = async (proposal) => {
//   //   setSelectedProposal(proposal);
//   //   try {
//   //     const response = await axios.get(
//   //       `http://localhost:5000/api/chat/by-proposal/${proposal._id}`
//   //     );
//   //     if (response.data?.success) {
//   //       setMessages(response.data.messages);
//   //     } else {
//   //       setMessages([]);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching messages:', error);
//   //   }
//   // };
//   const getJobOwnerByJobId = async (jobId) => {
//     try {
//       // Call job-posting API to get job details by jobId
//       const response = await axios.get(`http://localhost:5000/api/job-posting/${jobId}`);
      
//       // Check if job data is found
//       if (response.data) {
//         // Extract the userId (owner of the job)
//         const jobOwnerId = response.data.userId;
//         console.log("Job Owner ID (userId):", jobOwnerId); // Log the owner userId
//       } else {
//         console.log("Job not found or error fetching job details.");
//       }
//     } catch (error) {
//       console.error("Error fetching job details from job-posting API:", error);
//     }
//   };
  
//   const getMessages = async (proposal) => {
//     // Get jobId from the selected proposal
//     const jobId = proposal.jobId?._id || proposal.jobId;
  
//     console.log("Selected Proposal:", proposal);
//     console.log("Job ID:", jobId); // Log the jobId
    
//     // Fetch job details using the jobId
//     await getJobOwnerByJobId(jobId);
  
//     // Fetch messages as usual
//     try {
//       const response = await axios.get(`http://localhost:5000/api/chat/by-proposal/${proposal._id}`);
//       if (response.data?.success) {
//         setMessages(response.data.messages);
//       } else {
//         setMessages([]);
//       }
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };
  
  
  

//   // Updated handleSendMessage function
//   const handleSendMessage = async () => {
//     if (newMessage.trim() && selectedProposal) {
//       const { jobId, _id: proposalId } = selectedProposal;
  
//       // Debugging log to ensure the jobId and proposalId are correct
//       console.log('Selected Proposal:', selectedProposal);
//       console.log('Job ID:', jobId);  // Make sure jobId is correct
  
//       try {
//         // Step 1: Fetch job details using jobId to get the employer's userId
//         const jobResponse = await axios.get(`http://localhost:5000/api/job-offers/${jobId}`);
        
//         if (jobResponse.data?.success) {
//           const employerId = jobResponse.data.job.userId;  // Extract employer's userId
  
//           // Step 2: Prepare the message data with the correct receiverId
//           const messageData = {
//             jobId: jobId,
//             proposalId: proposalId,
//             senderId: loggedInCandidateId,  // Candidate's userId
//             receiverId: employerId,  // Employer's userId as receiverId
//             message: newMessage,  // Message content
//           };
  
//           // Step 3: Send the message to the chat API
//           const res = await axios.post('http://localhost:5000/api/chat', messageData);
//           setMessages([...messages, res.data]);
//           setNewMessage('');
//         } else {
//           console.error("Failed to fetch job details.");
//         }
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     }
//   };
  
//   return (
//     <div className="container d-flex">
//       {/* Sidebar for proposals */}
//       <div className="sidebar" style={{ width: '300px', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
//         <h3>Your Applications</h3>
//         {loading && <p>Loading proposals...</p>}
//         {error && <p className="text-danger">{error}</p>}
//         {!loading && proposals.length === 0 && <p>No proposals yet.</p>}

//         <div className="list-group">
//           {proposals.map((proposal) => (
//             <div
//               key={proposal._id}
//               className="list-group-item d-flex justify-content-between align-items-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => {
//                 if (proposal._id) {
//                   getMessages(proposal);
//                 } else {
//                   alert('Proposal ID missing. Please try again later.');
//                 }
//               }}
//             >
//               <div className="d-flex align-items-center">
//                 <img
//                   src={proposal.employerId?.profilePic || 'default-profile-pic.jpg'}
//                   alt="Profile"
//                   style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
//                 />
//                 <span>{proposal.employerId?.firstName} {proposal.employerId?.lastName}</span>
//               </div>
//               <div>
//                 <small>{proposal.message || 'No recent message'}</small>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main chat area */}
//       <div className="chat-container" style={{ flexGrow: 1, paddingLeft: '20px' }}>
//         {selectedProposal && (
//           <>
//             <h3>Chat with Employer</h3>
//             <div className="messages" style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1rem' }}>
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     textAlign: msg.senderId === loggedInCandidateId ? 'right' : 'left',
//                     marginBottom: '10px',
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: 'inline-block',
//                       backgroundColor: msg.senderId === loggedInCandidateId ? '#dcf8c6' : '#f1f0f0',
//                       padding: '8px 12px',
//                       borderRadius: '15px',
//                       maxWidth: '75%',
//                     }}
//                   >
//                     <p className="mb-0">{msg.message}</p>
//                     <small style={{ fontSize: '10px', display: 'block', marginTop: '4px' }}>
//                       {new Date(msg.sentAt).toLocaleString()}
//                     </small>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="message-input d-flex">
//               <textarea
//                 className="form-control me-2"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 rows={2}
//               />
//               <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandidateChat;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CandidateChat = () => {
  const [proposals, setProposals] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loggedInCandidateId = JSON.parse(localStorage.getItem('profile'))?._id;

  useEffect(() => {
    if (!loggedInCandidateId) {
      setError('Profile not found. Please log in.');
      setLoading(false);
      return;
    }

    const fetchProposals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/job-offers/candidate-proposals/${loggedInCandidateId}`
        );
        if (response.data?.success && response.data.proposals) {
          setProposals(response.data.proposals);
        } else {
          setProposals([]);
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching proposals.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProposals();
  }, [loggedInCandidateId]);

  const getJobOwnerByJobId = async (jobId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/job-posting/${jobId}`);
      
      if (response.data) {
        const jobOwnerId = response.data.userId;
        console.log("Job Owner ID (userId):", jobOwnerId);
        return jobOwnerId;
      } else {
        console.log("Job not found or error fetching job details.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
      return null;
    }
  };

  const getMessages = async (proposal) => {
    const jobId = proposal.jobId?._id || proposal.jobId;
    console.log("Selected Proposal:", proposal);
    console.log("Job ID:", jobId);

    // Fetch job owner (employer) ID dynamically
    const employerId = await getJobOwnerByJobId(jobId);

    if (employerId) {
      setSelectedProposal(proposal);
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/by-proposal/${proposal._id}`);
        if (response.data?.success) {
          setMessages(response.data.messages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedProposal) {
      const { jobId, _id: proposalId } = selectedProposal;
  
      // Check and ensure that jobId is a string, not an object
      const jobIdString = jobId?._id || jobId;
  
      if (jobIdString) {
        try {
          // Fetch the job owner (employer) using the jobId
          const employerId = await getJobOwnerByJobId(jobIdString);
  
          if (employerId) {
            const messageData = {
              jobId: jobIdString,
              proposalId: proposalId,
              senderId: loggedInCandidateId,
              receiverId: employerId,
              message: newMessage,
            };
  
            const res = await axios.post('http://localhost:5000/api/chat', messageData);
            setMessages([...messages, res.data]);
            setNewMessage('');
          } else {
            console.error("Failed to retrieve employer's userId.");
          }
        } catch (error) {
          console.error("Error sending message:", error);
        }
      } else {
        console.error("Invalid jobId.");
      }
    }
  };
  
  

  return (
    <div className="container d-flex">
    {/* Sidebar for proposals */}
    <div className="sidebar" style={{ width: '300px', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
      <h3>Your Applications</h3>
      {loading && <p>Loading proposals...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && proposals.length === 0 && <p>No proposals yet.</p>}
  
      <div className="list-group">
        {proposals.map((proposal) => (
          <div
            key={proposal._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => getMessages(proposal)}
          >
            <div className="d-flex align-items-center">
              <img
                src={proposal.employerId?.profilePic || 'default-profile-pic.jpg'}
                alt="Profile"
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
              />
              <span>{proposal.employerId?.firstName} {proposal.employerId?.lastName}</span>
            </div>
            <div>
              <small>{proposal.message || 'No recent message'}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    {/* Main chat area */}
    <div className="chat-container" style={{ flexGrow: 1, paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
      {selectedProposal && (
        <>
          <h3>Chat with Employer</h3>
          <div className="messages" style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1rem' }}>
  {messages.map((msg, index) => (
    <div
      key={index}
      style={{
        textAlign: msg.senderId === loggedInCandidateId ? 'right' : 'left',
        marginBottom: '10px',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          backgroundColor: msg.senderId === loggedInCandidateId ? '#dcf8c6' : '#f1f0f0',
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
              style={{ flexGrow: 1 }}
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  </div>
  
  );
};

export default CandidateChat;
