import React, { useRef } from "react";

/* ============================
   NON-OPTIMIZED COMPONENT
============================ */

export function NonOptimizedPostList({ posts, onDelete }) {
  const renderCount = useRef(0);

  // Count renders without updating React state
  renderCount.current += 1;

  console.log(
    "🔴 Non-Optimized PostList Render:",
    renderCount.current
  );

  return (
    <section className="posts-section">
      <div className="post-header">
        <div>
          <h2>🔴 Non-Optimized Post List</h2>

          <p className="render-info">
            Component renders:{" "}
            <strong>{renderCount.current}</strong>
          </p>
        </div>
      </div>

      <div className="posts-list">
        {posts.length === 0 ? (
          <p>No scheduled posts.</p>
        ) : (
          posts.map((post) => (
            <div className="post-item" key={post.id}>
              <div>
                <strong>{post.title}</strong>

                <p>
                  {post.platform} •{" "}
                  {new Date(post.date).toLocaleString()}
                </p>
              </div>

              <button
                className="delete-btn"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}


/* ============================
   OPTIMIZED COMPONENT
============================ */

const OptimizedPostList = React.memo(function OptimizedPostList({
  posts,
  onDelete,
}) {
  const renderCount = useRef(0);

  // Count renders without updating React state
  renderCount.current += 1;

  console.log(
    "🟢 Optimized PostList Render:",
    renderCount.current
  );

  return (
    <section className="posts-section">
      <div className="post-header">
        <div>
          <h2>🟢 Optimized Post List</h2>

          <p className="render-info">
            Component renders:{" "}
            <strong>{renderCount.current}</strong>
          </p>
        </div>
      </div>

      <div className="posts-list">
        {posts.length === 0 ? (
          <p>No scheduled posts.</p>
        ) : (
          posts.map((post) => (
            <div className="post-item" key={post.id}>
              <div>
                <strong>{post.title}</strong>

                <p>
                  {post.platform} •{" "}
                  {new Date(post.date).toLocaleString()}
                </p>
              </div>

              <button
                className="delete-btn"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
});

export default OptimizedPostList;