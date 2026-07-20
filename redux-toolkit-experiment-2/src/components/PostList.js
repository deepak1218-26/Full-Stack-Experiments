import { useSelector } from "react-redux";

export default function PostList() {

  const posts = useSelector(
    (state) => state.posts.posts
  );

  const getEmoji = (post) => {
    if (post.startsWith("Instagram")) return "📸";
    if (post.startsWith("Facebook")) return "📘";
    if (post.startsWith("LinkedIn")) return "💼";
    if (post.startsWith("Twitter")) return "🐦";
    return "📝";
  };

  return (
    <div className="card">

      <h3>Your Posts</h3>

      {posts.length === 0 ? (
        <p className="empty">No posts yet.</p>
      ) : (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              {getEmoji(post)} {post}
            </li>
          ))}
        </ul>
      )}

      <div className="footer">
        Total Posts : {posts.length}
      </div>

    </div>
  );
}