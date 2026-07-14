import React, { useState } from "react";
import "./PostComposer.css";

const platformLimits = {
  Twitter: 280,
  Facebook: 63206,
  Instagram: 2200,
  LinkedIn: 3000,
};

function PostComposer() {
  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");

  const limit = platformLimits[platform];
  const characters = post.length;
  const remaining = limit - characters;

  return (
    <div className="container">
      <h1>Social Media Post Composer</h1>

      <label>Select Platform</label>

      <select
        value={platform}
        onChange={(e) => {
          setPlatform(e.target.value);
          setPost("");
        }}
      >
        <option>Twitter</option>
        <option>Facebook</option>
        <option>Instagram</option>
        <option>LinkedIn</option>
      </select>

      <textarea
        placeholder="Write your post here..."
        rows="8"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <p className="count">
        Characters: {characters}/{limit}
      </p>

      {remaining >= 0 ? (
        <p className="success">
          Remaining Characters: {remaining}
        </p>
      ) : (
        <p className="error">
          Character limit exceeded by {-remaining} characters.
        </p>
      )}

      <button disabled={remaining < 0 || post.length === 0}>
        Publish Post
      </button>
    </div>
  );
}

export default PostComposer;