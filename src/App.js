import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MainNav from "./components/mian-nav";
import Login from "./components/login";
import Home from "./components/home";
import Signup from "./components/signup";
import ProductDetails from "./components/product-detail";
import Cart from "./components/cart";
import LoginForm from "./components/LoginForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProfileForm from "./components/profile";
import Availability from "./components/Availability";
import Rate from "./components/Rate";
import Qualification from "./components/Qualification";
import Language from "./components/Language";
import AvailabilityInDays from "./components/AvailabilityDays";
import Description from "./components/Description";
import Location from "./components/Location";
import PersonalDetails from "./components/PersonalDetails";
import MembershipType from "./components/MembershipType";
import OtherDetails from "./components/OtherDetails";
import PhotoUpload from "./components/PhotoUpload";
import ServiceType from "./components/Service-Type";
import ProfileList from "./components/profile/Profile-list";
import ProfileDetail from "./components/profile/profile-detail";
import JobList from "./components/job-list";
import JobForm from "./components/job";
import JobDetail from "./components/job-detail";
import Messages from "./components/message";
import CandidateDashboard from "./components/candidate-dashboard/dashboard";
import HomeTab from "./components/candidate-dashboard/home";
import ProfileDashboard from "./components/candidate-dashboard/profile";
import ProfileViews from "./components/candidate-dashboard/profile-view";
import { AuthProvider } from "./context/AuthContext";
import UsersList from "./components/users/user";
import EditUser from "./components/users/edit-user";
import EmployeerServiceTypeMultiSelect from "./components/employeer-dashboard/service-type";
import AvailabilityCandidate from "./components/employeer-dashboard/availability";
import JobLocation from "./components/employeer-dashboard/job-location";
import PatientInfo from "./components/employeer-dashboard/Patient-info";
import JobDescription from "./components/employeer-dashboard/job-discription";
import ImageUploadPreview from "./components/employeer-dashboard/image-upload";
import ChatComponent from "./components/chat";
import CandidateChat from "./components/candidate-dashboard/candidate-chat";
import EmployerProposals from "./components/employeer-dashboard/employer.chat";

const App = () => {
  const [formData, setFormData] = useState({
    serviceType: "",
    availability: "",
    rate: "",
  });

  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];

  return (
    <AuthProvider>
      {!hideNavbarRoutes.includes(location.pathname) && <MainNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup formData={formData} setFormData={setFormData} />} />
        <Route path="/candidate-service-type" element={<ServiceType formData={formData} setFormData={setFormData} />} />
        <Route path="/availability" element={<Availability formData={formData} setFormData={setFormData} />} />
        <Route path="/rate" element={<Rate formData={formData} setFormData={setFormData} />} />
        <Route path="/qualification" element={<Qualification formData={formData} setFormData={setFormData} />} />
        <Route path="/language" element={<Language formData={formData} setFormData={setFormData} />} />
        <Route path="/availableDays" element={<AvailabilityInDays formData={formData} setFormData={setFormData} />} />
        <Route path="/description" element={<Description formData={formData} setFormData={setFormData} />} />
        <Route path="/location" element={<Location formData={formData} setFormData={setFormData} />} />
        <Route path="/personal-details" element={<PersonalDetails formData={formData} setFormData={setFormData} />} />
        <Route path="/membership-type" element={<MembershipType formData={formData} setFormData={setFormData} />} />
        <Route path="/other-details" element={<OtherDetails formData={formData} setFormData={setFormData} />} />
        <Route path="/photo-upload" element={<PhotoUpload formData={formData} setFormData={setFormData} />} />
        <Route path="/profile/list" element={<ProfileList />} />
        <Route path="/profile/:id" element={<ProfileDetail />} />
        <Route path="/job" element={<JobForm />} />
        <Route path="/job/list" element={<JobList />} />
        <Route path="/job-posting/:id" element={<JobDetail />} />
        <Route path="/message" element={<Messages />} />
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate-dashboard/home" element={<HomeTab />} />
        <Route path="/candidate-dashboard/profile" element={<ProfileDashboard />} />
        <Route path="/candidate-dashboard/profile-views" element={<ProfileViews />} />
        {/* Users List */}
        <Route path="/users/list" element={<UsersList />} />
        <Route path="/edit-user/:id" element={<EditUser />} />

        {/* Employer Routing */}
        <Route path="/employeer-service-type" element={<EmployeerServiceTypeMultiSelect formData={formData} setFormData={setFormData} />} />
        <Route path="/availability-candidate" element={<AvailabilityCandidate formData={formData} setFormData={setFormData} />} />
        <Route path="/job-location" element={<JobLocation formData={formData} setFormData={setFormData} />} />
        <Route path="/patient-details" element={<PatientInfo formData={formData} setFormData={setFormData} />} />
        <Route path="/job-description" element={<JobDescription formData={formData} setFormData={setFormData} />} />
        <Route path="/image-preview" element={<ImageUploadPreview formData={formData} setFormData={setFormData} />} />


        {/* CHat Routing */}
        <Route path="/chat" element={<ChatComponent />} />
        <Route path="/candidate-chat" element={<CandidateChat />} />
        {/* <Route path="/employer-chat" element={<EmployerProposals />} /> */}
        {/* <Route path="/candidate-chat" element={CandidateChat} /> */}
        
      </Routes>
    </AuthProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
