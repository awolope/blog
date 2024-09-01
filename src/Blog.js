import React, { useState, useEffect } from "react";
import { FaTrash, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const BlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("Technology");
  const [image, setImage] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const genres = ["Technology", "Lifestyle", "Education", "Entertainment"];

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(allPosts);
  }, []);

  const handleAddPost = (e) => {
    e.preventDefault();

    if (!title || !content) return;

    const newPost = {
      id: Date.now(), // Unique ID for the post
      title,
      content,
      genre,
      image,
      authorEmail: JSON.parse(localStorage.getItem("user")).email,
      authorUsername: JSON.parse(localStorage.getItem("user")).username,
      likes: 0,
      comments: [], // Initialize comments as an empty array
      date: new Date().toISOString(),
    };

    const updatedPosts = [...posts, newPost];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setTitle("");
    setContent("");
    setImage(null);
    setShowAddPost(false);
  };

  const handleDeletePost = (postToDelete) => {
    const updatedPosts = posts.filter((post) => post.id !== postToDelete.id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleLike = (postToLike) => {
    const updatedPosts = posts.map((post) =>
      post.id === postToLike.id ? { ...post, likes: post.likes + 1 } : post
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleComment = (post, comment) => {
    const updatedPosts = posts.map((p) =>
      p.id === post.id ? { ...p, comments: [...p.comments, comment] } : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search)
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Default sorting by date

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4">
            <h2 className="text-center mb-4">Blog Posts</h2>

            <div className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search..."
                onChange={handleSearch}
              />

              <button
                className="btn btn-primary mb-4"
                onClick={() => setShowAddPost(!showAddPost)}
              >
                {showAddPost ? "Cancel" : "Add Blog"}
              </button>

              {showAddPost && (
                <form onSubmit={handleAddPost}>
                  <div className="form-group mb-3">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Content</label>
                    <textarea
                      className="form-control"
                      placeholder="Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Genre</label>
                    <select
                      className="form-control"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                    >
                      {genres.map((g, index) => (
                        <option key={index} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label>Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setImage(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                    {image && (
                      <img
                        src={image}
                        alt="Preview"
                        className="img-thumbnail mt-2"
                      />
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </form>
              )}

              <div className="mt-4">
                {filteredPosts.length === 0 ? (
                  <p className="text-center">No posts available.</p>
                ) : (
                  filteredPosts.map((post) => (
                    <div key={post.id} className="mb-3">
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post"
                          className="img-thumbnail mb-2"
                        />
                      )}
                      <h5>{post.title}</h5>
                      <p>{post.content}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleLike(post)}
                          >
                            <FaThumbsUp /> {post.likes}
                          </button>
                          <button
                            className="btn btn-outline-secondary btn-sm ms-2"
                            onClick={() => handleLike(post)}
                          >
                            <FaThumbsDown />
                          </button>
                        </div>
                        {post.authorEmail ===
                          JSON.parse(localStorage.getItem("user")).email && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeletePost(post)}
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                      <div className="mt-2">
                        {post.comments && post.comments.length > 0 && (
                          <div>
                            <h6>Comments:</h6>
                            {post.comments.map((comment, index) => (
                              <div key={index} className="border p-2 mb-2">
                                <p className="mb-1">{comment.text}</p>
                                <p className="text-muted mb-0">
                                  By: {comment.username}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const commentText = e.target.comment.value;
                            const username = JSON.parse(
                              localStorage.getItem("user")
                            ).username;
                            handleComment(post, {
                              text: commentText,
                              username,
                            });
                            e.target.comment.value = "";
                          }}
                        >
                          <input
                            type="text"
                            name="comment"
                            className="form-control"
                            placeholder="Add a comment..."
                            required
                          />
                          <button
                            type="submit"
                            className="btn btn-primary mt-2"
                          >
                            Add Comment
                          </button>
                        </form>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
