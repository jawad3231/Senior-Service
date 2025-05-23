import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash'; // Import lodash for debouncing
import { NavLink } from "react-router-dom";

const ProfileList = () => {
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedGender, setSelectedGender] = useState("Any");
    const [selectedEmployment, setSelectedEmployment] = useState("Any");
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [onlyPhoto, setOnlyPhoto] = useState(false);

    const serviceTypes = [
        "Plumbing",
        "Electrical",
        "Carpentry",
        "Cleaning",
        "Landscaping"
    ];

    const languages = ["German", "French", "Italian", "English"];

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile');
                const visibleProfiles = response.data.filter(profile => profile.isVisible);  // Filter profiles by visibility
                setProfiles(visibleProfiles); // Store visible profiles only
                setFilteredProfiles(visibleProfiles); // Initialize filtered profiles with visible profiles
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch profiles');
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    // Debounced Search Handler
    const handleSearch = _.debounce((query) => {
        if (query) {
            const filtered = profiles.filter((profile) =>
                `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
                (profile.description && profile.description.toLowerCase().includes(query.toLowerCase())) ||
                (profile.location && typeof profile.location === 'object' &&
                    (`${profile.location.city} ${profile.location.postalCode}`).toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredProfiles(filtered);
        } else {
            setFilteredProfiles(profiles); // Reset to all profiles if search is empty
        }
    }, 300); // 300ms debounce delay

    const onSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        handleSearch(query);
    };

    // Handle checkbox change for services
    const handleServiceChange = (e) => {
        const { value, checked } = e.target;

        setSelectedServices((prevSelected) => {
            if (checked) {
                return [...prevSelected, value];  // Add service to selected list
            } else {
                return prevSelected.filter((service) => service !== value);  // Remove service from selected list
            }
        });
    };

    // Filter profiles by selected services
    const filteredByServices = filteredProfiles.filter((profile) => {
        if (selectedServices.length === 0) {
            return true; // If no services are selected, show all profiles
        }
        return selectedServices.some(service => profile.services?.includes(service));
    });

    // Filter profiles by selected gender
    const filteredByGender = filteredByServices.filter(profile => {
        if (selectedGender === "Any") return true;
        return profile.gender === selectedGender;
    });

    // Filter profiles by selected employment
    const filteredByEmployment = filteredByGender.filter(profile => {
        if (selectedEmployment === "Any") return true;
        return profile.employmentType === selectedEmployment;
    });

    // Filter profiles by selected languages
    const filteredByLanguages = filteredByEmployment.filter(profile => {
        if (selectedLanguages.length === 0) return true;
        return selectedLanguages.every(language => profile.languages?.includes(language));
    });

    // Filter profiles by "Only Photo" toggle
    const filteredProfilesWithPhoto = filteredByLanguages.filter(profile => {
        if (onlyPhoto) {
            return profile.photo != null;
        }
        return true;
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            

            <h2 className="text-center mb-4">All Profiles</h2>
            <div className="row">
                <div className='col-lg-4 mb-4'>
                    <div>
                        <input
                            className="form-control"
                            placeholder="Search profiles..."
                            value={searchTerm}
                            onChange={onSearchChange}
                        />
                    </div>
                    <br />
                    <div>
                        <label className="form-label fw-bold mt-3">Max distance </label>
                        <div className="position-relative mb-4" style={{ height: '40px' }}>
                            <input
                                type="range"
                                className="form-range position-absolute top-0"
                                min="0"
                                max="100"
                                step="1"
                                style={{ zIndex: 2 }}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <label className="form-label fw-bold">Service Types</label>
                        {serviceTypes.map((service, idx) => (
                            <div className="form-check" key={idx}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={service}
                                    id={`service-${idx}`}
                                    onChange={handleServiceChange}
                                />
                                <label className="form-check-label" htmlFor={`service-${idx}`}>{service}</label>
                            </div>
                        ))}
                    </div>
                    <div className="container mt-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink 
                            to="#"
                            className={`nav-link ${selectedGender === "Any" ? "bg-primary text-white" : "bg-light"}`}
                            onClick={() => setSelectedGender("Any")}
                        >
                            Any
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            to="#"
                            className={`nav-link ${selectedGender === "Female" ? "bg-primary text-white" : "bg-light"}`}
                            onClick={() => setSelectedGender("Female")}
                        >
                            Female
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            to="#"
                            className={`nav-link ${selectedGender === "Male" ? "bg-primary text-white" : "bg-light"}`}
                            onClick={() => setSelectedGender("Male")}
                        >
                            Male
                        </NavLink>
                    </li>
                </ul>
            </div>
                    {/* Language Selection */}
                    <div className="mt-3">
                        <label className="form-label fw-bold">Languages</label>
                        {languages.map((language, idx) => (
                            <div className="form-check" key={idx}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={language}
                                    id={`language-${idx}`}
                                    onChange={(e) => {
                                        const { value, checked } = e.target;
                                        setSelectedLanguages(prev => 
                                            checked 
                                            ? [...prev, value] 
                                            : prev.filter(lang => lang !== value)
                                        );
                                    }}
                                />
                                <label className="form-check-label" htmlFor={`language-${idx}`}>{language}</label>
                            </div>
                        ))}
                    </div>

                    {/* Employment Type Tabs */}
                    <div className="mt-3">
                        <label className="form-label fw-bold">Employment Type</label>
                        <div className="btn-group" role="group">
                            <button 
                                type="button" 
                                className={`btn ${selectedEmployment === "Any" ? "btn-primary" : "btn-light"}`} 
                                onClick={() => setSelectedEmployment("Any")}
                            >
                                Any
                            </button>
                            <button 
                                type="button" 
                                className={`btn ${selectedEmployment === "Part Time" ? "btn-primary" : "btn-light"}`} 
                                onClick={() => setSelectedEmployment("Part Time")}
                            >
                                Part Time
                            </button>
                            <button 
                                type="button" 
                                className={`btn ${selectedEmployment === "Full Time" ? "btn-primary" : "btn-light"}`} 
                                onClick={() => setSelectedEmployment("Full Time")}
                            >
                                Full Time
                            </button>
                        </div>
                    </div>

                    {/* Keyword Input */}
                    <div className="mt-3">
                        <label className="form-label fw-bold">Keyword</label>
                        <input
                            type="text"
                            className="form-control"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Enter keyword"
                        />
                    </div>

                    {/* Only Photo Toggle */}
                    <div className="mt-3 d-flex align-items-center">
                        <label className="form-label fw-bold me-2">Only Photo</label>
                        <input
                            type="checkbox"
                            checked={onlyPhoto}
                            onChange={() => setOnlyPhoto(!onlyPhoto)}
                        />
                    </div>

                    <br />
                    <button className="btn btn-light mt-4">Less Filters</button>
                </div>

                <div className="col-8">
                    <div className="list-group">
                        {filteredProfilesWithPhoto.map((profile) => (
                            <div key={profile._id} className="list-group-item d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={profile.photo || 'default.jpg'}
                                        alt="Profile"
                                        className="rounded-circle me-2"
                                        width="50"
                                        height="50"
                                    />
                                    <div>
                                        <h5 className="mb-1">{profile.firstName} {profile.lastName}</h5>
                                        <p className="mb-0">{profile.description}</p>
                                    </div>
                                </div>
                                <button className="btn btn-outline-primary">View Profile</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileList;
