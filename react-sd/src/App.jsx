import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // 🎨 Your styles

// 🧩 Guest Sections
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import RoomsSection from "./RoomsSection";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Services from "./Services";
import Footer from "./Footer";


// 📄 Guest Pages
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Dashboard from "./pages/Dashboard";
import BookingPage from './pages/BookingPage'; 
import EditProfile from "./pages/EditProfile";

// 🔐 Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoom from "./pages/AdminRoom";
import InventoryPage from "./pages/InventoryPage";
import BookingViews from "./pages/admin-view-bookings";
import UsersPage from "./pages/UsersPage";
import AddAdminPage from "./pages/AddAdminPage";
import MyProfile from "./pages/MyProfile";

// 🏠 Guest Home Layout
const GuestHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <RoomsSection />
      <AboutUs />
      <ContactUs />
      <Services />
      <Footer />
    </div>
  );
};

// 🌐 App Router
const App = () => {
  return (
    <Router>
      <Routes>
        {/* 🌍 Guest/User Routes */}
        <Route path="/" element={<GuestHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/editprofile" element={<EditProfile />} />

        {/* 🔐 Admin Login */}
        <Route path="/AdminLogin" element={<AdminLogin />} />

        {/* 🛡️ Admin Dashboard Layout with Nested Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="rooms" element={<AdminRoom />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="bookings" element={<BookingViews />} />
          <Route path="users" element={<UsersPage/>} />
          <Route path="add-admin" element={<AddAdminPage />} />
          <Route path="profile" element={<MyProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
