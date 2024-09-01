import React from "react";
import SetupProfilePage from "./setupprofile";
import ProfilePage from "./profilepagee";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import BlogPostPage from "./Blog";
import SignupPage from "./SignUp";
import LoginPage from "./Login";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotificationPage from "./Notification";
import "./App.css";
const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/" && (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/setupprofile" element={<SetupProfilePage />} />
        <Route path="/blog" element={<BlogPostPage />} />
        <Route path="/notification" element={<NotificationPage />} />
      </Routes>
      {location.pathname !== "/login" && location.pathname !== "/" && (
        <Footer />
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
