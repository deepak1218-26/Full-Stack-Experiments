import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredPosts } from "../features/selectors";

const PostsList = React.memo(() => {
  const posts = useSelector(selectFilteredPosts);

  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <div className="card" key={post.id}>
          <h2>{post.title}</h2>

          <p>
            <strong>Platform:</strong> {post.platform}
          </p>

          <p>
            ❤️ <strong>{post.likes}</strong> Likes
          </p>
        </div>
      ))}
    </div>
  );
});

export default PostsList;