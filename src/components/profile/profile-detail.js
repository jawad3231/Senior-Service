import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileDetail = () => {
    const { id } = useParams(); // Get the profile ID from the URL
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/profile/${id}`);
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch profile details');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    const handleFavorite = async () => {
        try {
            await axios.post(`http://localhost:5000/api/profile/${id}/favorite`);
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Failed to update favorite status', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            <h2 className="fw-bold">Profile Details</h2>
            <div className="row mt-3">
                <div className="col-md-4">
                    <div className="card p-3 mb-3 text-center">
                        <img
                            src={profile.photo ? `http://localhost:5000/${profile.photo}` : 'https://via.placeholder.com/150'}
                            className="rounded-circle img-fluid mb-3"
                            alt={profile.firstName}
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <h4>{profile.firstName} {profile.lastName}</h4>
                        <p>{profile.location?.city || "Location not set"}</p>
                        <button className="btn btn-outline-danger" onClick={handleFavorite}>
                            {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
                        </button>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card p-3 mb-3">
                        <h4>Job Details</h4>
                        {profile.serviceType?.map((service, index) => (
                            <p key={index}><strong>Service Type:</strong> {service}</p>
                        ))}
                        <p><strong>Rate:</strong> {profile.rate || "N/A"}</p>
                        <p><strong>Availability:</strong> {profile.availability?.join(", ") || "N/A"}</p>
                    </div>

                    <div className="card p-3 mb-3">
                        <h4>Personal Introduction</h4>
                        <p>{profile.description || "No description provided"}</p>
                    </div>

                    <div className="card p-3 mb-3">
                        <h4>Qualifications & Experience</h4>
                        <p><strong>Education:</strong> {profile.education || "Not specified"}</p>
                        <p><strong>Experience:</strong> {profile.experience || "No experience provided"}</p>
                        <p><strong>Languages:</strong> {profile.languages?.join(", ") || "Not specified"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;