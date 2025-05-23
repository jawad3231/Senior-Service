import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployerChat = () => {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setError('User ID is not available.');
      setLoading(false);
      return;
    }

    const fetchProposals = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/porposals/employer-proposals/${userId}`);
        console.log("Fetched proposals:", response.data);
        if (response.data.success) {
          setProposals(response.data.proposals);
        } else {
          setError('No proposals found.');
        }
      } catch (err) {
        console.error("❌ Error fetching proposals:", err);
        setError('Failed to fetch proposals.');
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [userId]);

  return (
    <div style={{ padding: '20px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1>Employer Proposals</h1>
      {loading ? (
        <p>Loading proposals...</p>
      ) : (
        <div>
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <div key={proposal._id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', marginBottom: '15px' }}>
                <h2>Job Headline: {proposal.jobId?.jobDescription?.headline || 'N/A'}</h2>
                {/* Location data is not present in your backend response */}
                <p><strong>Proposal Message:</strong> {proposal.message}</p>
                <p><strong>Sender Email:</strong> {proposal.userId?.email || 'N/A'}</p>
                <p><strong>Date Sent:</strong> {new Date(proposal.offeredAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No proposals available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployerChat;
