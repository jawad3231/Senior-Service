import React, { useState } from "react";
import axios from "axios";

export default function JobForm() {
    const [formData, setFormData] = useState({
        typesOfCare: [],
        frequency: "One Time",
        workStart: "As soon as possible",
        startDate: "",
        expectedHours: "2 hours",
        description: "",
        headline: "",
        personalInfo: {
            // gender: "",
            firstName: "",
            lastName: "",
            location: { postalCode: "", city: "" }
        },
        isCompany: false,
        photo: null,
        isPublic: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            if (name.startsWith("personalInfo.location.")) {
                const field = name.split(".")[2];
                return {
                    ...prev,
                    personalInfo: {
                        ...prev.personalInfo,
                        location: { ...prev.personalInfo.location, [field]: value },
                    },
                };
            } else if (name.startsWith("personalInfo.")) {
                const field = name.split(".")[1];
                return {
                    ...prev,
                    personalInfo: { ...prev.personalInfo, [field]: value },
                };
            } else if (name.startsWith("description.")) {
                const field = name.split(".")[1];
                return {
                    ...prev,
                    description: { ...prev.description, [field]: value },
                };
            } else if (type === "checkbox") {
                return { ...prev, [name]: checked };
            }
            return { ...prev, [name]: value };
        });
    };


    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFormData((prev) => ({
                ...prev,
                photo: e.target.files[0],
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const structuredData = {
                ...formData,
                personalInfo: {
                    ...formData.personalInfo,
                    location: {
                        postalCode: formData.personalInfo.location.postalCode,
                        city: formData.personalInfo.location.city,
                    },
                },
            };
            const response = await axios.post("http://localhost:5000/api/jobs", structuredData);
            console.log("Job posted:", response.data);
        } catch (error) {
            console.error("Error posting job", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Post a Job</h1>


            <input type="text" name="description.headline" placeholder="Headline" className="p-2 border rounded w-full mb-2" onChange={handleChange} />
            <textarea name="description.jobDetails" placeholder="Job Description" className="p-2 border rounded w-full mb-2" onChange={handleChange} />

            <label className="block mb-2">First Name:</label>
            <input type="text" name="personalInfo.firstName" placeholder="First Name" className="p-2 border rounded w-full mb-2" onChange={handleChange} />

            <label className="block mb-2">Last Name:</label>
            <input type="text" name="personalInfo.lastName" placeholder="Last Name" className="p-2 border rounded w-full mb-2" onChange={handleChange} />

            <label className="block mb-2">Postal Code:</label>
            <input type="text" name="personalInfo.location.postalCode" placeholder="Postal Code" className="p-2 border rounded w-full mb-2" onChange={handleChange} />

            <label className="block mb-2">City Name:</label>
            <input type="text" name="personalInfo.location.city" placeholder="City Name" className="p-2 border rounded w-full mb-2" onChange={handleChange} />

            <label className="block mb-2">Select Gender:</label>
            <div className="flex gap-2 mb-2">
                {["Male", "Female", "Other"].map((gender) => (
                    <button
                        key={gender}
                        type="button"
                        className={`p-2 border rounded ${formData.personalInfo.gender === gender ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setFormData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, gender },
                        }))}
                    >
                        {gender}
                    </button>
                ))}
            </div>

            <label className="block mb-2">Work Start:</label>
            <select name="workStart" className="p-2 border rounded w-full mb-2" onChange={handleChange}>
                <option value="As soon as possible">ASAP</option>
                <option value="Select Date">Select Date</option>
            </select>
            {formData.workStart === "Select Date" && (
                <input type="date" name="startDate" className="p-2 border rounded w-full mb-2" onChange={handleChange} />
            )}
            <input type="file" name="photo" className="p-2 border rounded w-full mb-2" onChange={handleFileChange} />
            {formData.photo && (
                <div className="mb-2">
                    <img src={URL.createObjectURL(formData.photo)} alt="Preview" className="w-32 h-32 object-cover rounded" />
                </div>
            )}
            <label className="block mb-2">Select Types of Care:</label>
            <div className="flex flex-wrap gap-2 mb-2">
                {["Elderly Care", "Child Care", "Pet Care", "Disability Support"].map((type) => (
                    <button
                        key={type}
                        type="button"
                        className={`p-2 border rounded ${formData.typesOfCare.includes(type) ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() =>
                            setFormData((prev) => ({
                                ...prev,
                                typesOfCare: prev.typesOfCare.includes(type)
                                    ? prev.typesOfCare.filter((t) => t !== type)
                                    : [...prev.typesOfCare, type]
                            }))
                        }
                    >
                        {type}
                    </button>
                ))}
            </div>

            <label className="block mb-2">Company:</label>
            <input type="checkbox" name="isCompany" checked={formData.isCompany} onChange={handleChange} className="mb-2" />

            <label className="block mb-2">Make Job Public:</label>
            <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} className="mb-2" />

            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
        </form>
    );
}