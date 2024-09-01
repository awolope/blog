import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];

    setUser(userData);
    setPosts(allPosts.filter((post) => post.authorEmail === userData.email));

    // Set user profile details
    setUser((prevUser) => ({
      ...prevUser,
      ...userProfile,
    }));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4">
            <div className="text-center">
              <img
                src={user.profilePicture || "default-profile-pic.png"} // Fallback image
                alt="Profile"
                className="rounded-circle mb-3"
                width="150"
              />
            </div>
            <h3 className="text-center">{user.username || "Username"}</h3>
            <p className="text-center">{user.bio || "Bio not available"}</p>

            <div className="mt-4">
              <h4>Your Posts</h4>
              {posts.length === 0 ? (
                <p className="text-center">No posts available.</p>
              ) : (
                posts.map((post, index) => (
                  <div key={index} className="mb-3">
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="img-thumbnail mb-2"
                      />
                    )}
                    <h5>{post.title}</h5>
                    <p>{post.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
