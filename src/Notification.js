import React, { useState, useEffect } from "react";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const userEmail = JSON.parse(localStorage.getItem("user")).email;

    const userNotifications = allPosts
      .flatMap((post) =>
        post.comments
          .filter((comment) => comment.username === userEmail)
          .map((comment) => ({
            type: "comment",
            postTitle: post.title,
            comment: comment.text,
          }))
      )
      .concat(
        allPosts
          .filter((post) => post.authorEmail === userEmail)
          .map((post) => ({
            type: "like",
            postTitle: post.title,
            likes: post.likes,
          }))
      );

    setNotifications(userNotifications);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Notifications</h2>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {notifications.length === 0 ? (
            <p className="text-center">No notifications available.</p>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className="alert alert-info mb-3">
                {notification.type === "comment" ? (
                  <>
                    <strong>New Comment:</strong> {notification.comment} on "
                    {notification.postTitle}"
                  </>
                ) : (
                  <>
                    <strong>Likes Update:</strong> Your post "
                    {notification.postTitle}" has {notification.likes} likes
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
