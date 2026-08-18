import React from "react";

const PostList = React.memo(
  ({ posts, onDelete }) => {

    console.log(
      "PostList rendered"
    );

    return (
      <section className="posts-section">

        <h2>Scheduled Posts</h2>

        <div className="posts-list">

          {posts.length === 0 ? (
            <p>No scheduled posts.</p>
          ) : (
            posts.map((post) => (

              <div
                className="post-item"
                key={post.id}
              >

                <div>

                  <strong>
                    {post.title}
                  </strong>

                  <p>
                    {post.platform} •{" "}
                    {new Date(
                      post.date
                    ).toLocaleString()}
                  </p>

                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    onDelete(post.id)
                  }
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
);

export default PostList;