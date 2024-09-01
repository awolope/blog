import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SetupProfilePage = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleProfileSetup = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = () => {
      const userProfile = {
        username,
        bio,
        profilePicture: reader.result,
      };

      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      navigate("/profile");
    };

    if (profilePicture) {
      reader.readAsDataURL(profilePicture);
    } else {
      toast.error("Please upload a profile picture.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Set Up Profile</h2>
            <form onSubmit={handleProfileSetup}>
              <div className="form-group mb-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Bio</label>
                <textarea
                  className="form-control"
                  placeholder="Tell us about yourself"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  accept="image/*"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Save Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupProfilePage;
