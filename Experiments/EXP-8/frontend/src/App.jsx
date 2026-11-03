
import React, { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to Kafka Pipeline",
      author: "Admin",
      status: "Published",
      time: "Just now",
    },
    {
      id: 2,
      title: "Understanding Event Driven Architecture",
      author: "Deepak",
      status: "Processing",
      time: "2 min ago",
    },
    {
      id: 3,
      title: "Kafka Consumer Configuration",
      author: "Admin",
      status: "Failed",
      time: "5 min ago",
    },
  ]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [events, setEvents] = useState([
    { id: 101, name: "Post Created", status: "Success", time: "10:30 AM" },
    { id: 102, name: "Kafka Message Sent", status: "Success", time: "10:31 AM" },
    { id: 103, name: "Consumer Processing", status: "Processing", time: "10:32 AM" },
    { id: 104, name: "Delivery Failed", status: "Failed", time: "10:33 AM" },
  ]);

  const published = posts.filter((p) => p.status === "Published").length;
  const processing = posts.filter((p) => p.status === "Processing").length;
  const failed = posts.filter((p) => p.status === "Failed").length;

  const createPost = (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      author,
      status: "Pending",
      time: "Just now",
    };

    setPosts((prev) => [newPost, ...prev]);
    setEvents((prev) => [
      {
        id: Date.now(),
        name: "Post Created: " + title,
        status: "Success",
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    setTitle("");
    setAuthor("");
    setContent("");
    alert("Post added to the dashboard. Connect your backend API to publish through Kafka.");
  };

  const retryPost = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, status: "Pending", time: "Just now" } : post
      )
    );

    setEvents((prev) => [
      {
        id: Date.now(),
        name: "Retry requested",
        status: "Processing",
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  const navigation = [
    { name: "Dashboard", icon: "▦" },
    { name: "Create Post", icon: "＋" },
    { name: "Event Monitor", icon: "◉" },
    { name: "Dead Letter Queue", icon: "⚠" },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">K</div>
          <div>
            <h2>StreamFlow</h2>
            <span>EVENT PLATFORM</span>
          </div>
        </div>

        <div className="nav-heading">WORKSPACE</div>

        <nav>
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activePage === item.name ? "active" : ""}`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
              {item.name === "Dead Letter Queue" && failed > 0 && (
                <span className="nav-count">{failed}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="connection-card">
            <div className="connection-indicator"></div>
            <div>
              <strong>Kafka Broker</strong>
              <span>Connection status</span>
            </div>
            <span className="online-dot"></span>
          </div>
          <div className="profile">
            <div className="avatar">D</div>
            <div>
              <strong>Admin User</strong>
              <span>Administrator</span>
            </div>
            <span className="profile-menu">•••</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="breadcrumb">Workspace / {activePage}</div>
            <h1>{activePage}</h1>
          </div>
          <div className="topbar-right">
            <span className="environment">
              <span className="online-dot"></span> DEVELOPMENT
            </span>
            <button className="notification">♧</button>
            <div className="top-avatar">D</div>
          </div>
        </header>

        {activePage === "Dashboard" && (
          <section className="content">
            <div className="welcome-row">
              <div>
                <h2>Welcome back, Admin 👋</h2>
                <p>Here's what's happening with your publishing pipeline today.</p>
              </div>
              <button className="primary-btn" onClick={() => setActivePage("Create Post")}>
                ＋ Create new post
              </button>
            </div>

            <div className="stats-grid">
              <StatCard title="Total Posts" value={posts.length} icon="▤" color="blue" />
              <StatCard title="Published" value={published} icon="✓" color="green" />
              <StatCard title="Processing" value={processing} icon="◷" color="orange" />
              <StatCard title="Failed Events" value={failed} icon="!" color="red" />
            </div>

            <div className="dashboard-grid">
              <div className="panel posts-panel">
                <div className="panel-header">
                  <div>
                    <h3>Recent Posts</h3>
                    <p>Overview of your latest publishing activity</p>
                  </div>
                  <button className="text-btn" onClick={() => setActivePage("Event Monitor")}>
                    View events →
                  </button>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>POST TITLE</th>
                        <th>AUTHOR</th>
                        <th>STATUS</th>
                        <th>TIME</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td className="post-title">{post.title}</td>
                          <td>{post.author}</td>
                          <td><Status status={post.status} /></td>
                          <td>{post.time}</td>
                          <td>
                            {post.status === "Failed" ? (
                              <button className="retry-btn" onClick={() => retryPost(post.id)}>
                                ↻ Retry
                              </button>
                            ) : (
                              <span className="muted">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel activity-panel">
                <div className="panel-header">
                  <div>
                    <h3>System Activity</h3>
                    <p>Latest pipeline events</p>
                  </div>
                  <span className="live-label">● LIVE</span>
                </div>
                <div className="activity-list">
                  {events.slice(0, 5).map((event) => (
                    <div className="activity-item" key={event.id}>
                      <div className={`activity-icon ${event.status.toLowerCase()}`}>
                        {event.status === "Success" ? "✓" : event.status === "Failed" ? "!" : "◷"}
                      </div>
                      <div className="activity-info">
                        <strong>{event.name}</strong>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="info-banner">
              <div className="info-icon">✦</div>
              <div>
                <strong>Event-driven publishing pipeline</strong>
                <p>Manage posts, monitor Kafka events, and track failed message deliveries from one place.</p>
              </div>
            </div>
          </section>
        )}

        {activePage === "Create Post" && (
          <section className="content">
            <div className="page-intro">
              <h2>Create a new post</h2>
              <p>Submit content to your event-driven publishing workflow.</p>
            </div>

            <div className="form-panel">
              <div className="form-heading">
                <div className="form-heading-icon">✎</div>
                <div>
                  <h3>Post details</h3>
                  <p>Enter the information for your new post below.</p>
                </div>
              </div>

              <form onSubmit={createPost}>
                <label>Post title</label>
                <input
                  type="text"
                  placeholder="Enter an engaging post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label>Author name</label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />

                <label>Post content</label>
                <textarea
                  rows="7"
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <div className="form-footer">
                  <span>✦ Your post will appear in the dashboard.</span>
                  <button type="submit" className="primary-btn">Submit post →</button>
                </div>
              </form>
            </div>
          </section>
        )}

        {activePage === "Event Monitor" && (
          <section className="content">
            <div className="page-intro">
              <h2>Kafka Event Monitor</h2>
              <p>Track event activity and message processing statuses.</p>
            </div>

            <div className="stats-grid">
              <StatCard title="Total Events" value={events.length} icon="◉" color="blue" />
              <StatCard title="Successful" value={events.filter(e => e.status === "Success").length} icon="✓" color="green" />
              <StatCard title="In Progress" value={events.filter(e => e.status === "Processing").length} icon="◷" color="orange" />
              <StatCard title="Failed" value={events.filter(e => e.status === "Failed").length} icon="!" color="red" />
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h3>Event activity log</h3>
                  <p>Recent event processing activity</p>
                </div>
                <span className="live-label">● LIVE</span>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr><th>EVENT ID</th><th>EVENT</th><th>STATUS</th><th>TIME</th></tr>
                  </thead>
                  <tbody>
                    {events.map(event => (
                      <tr key={event.id}>
                        <td>#{event.id}</td>
                        <td className="post-title">{event.name}</td>
                        <td><Status status={event.status} /></td>
                        <td>{event.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activePage === "Dead Letter Queue" && (
          <section className="content">
            <div className="page-intro">
              <h2>Dead Letter Queue</h2>
              <p>Review failed messages and request another attempt.</p>
            </div>
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h3>Failed messages</h3>
                  <p>Messages that require attention</p>
                </div>
                <span className="live-label error-label">● NEEDS ATTENTION</span>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr><th>POST</th><th>AUTHOR</th><th>STATUS</th><th>LAST UPDATED</th><th>ACTION</th></tr>
                  </thead>
                  <tbody>
                    {posts.filter(post => post.status === "Failed").map(post => (
                      <tr key={post.id}>
                        <td className="post-title">{post.title}</td>
                        <td>{post.author}</td>
                        <td><Status status="Failed" /></td>
                        <td>{post.time}</td>
                        <td><button className="retry-btn" onClick={() => retryPost(post.id)}>↻ Retry</button></td>
                      </tr>
                    ))}
                    {failed === 0 && (
                      <tr><td colSpan="5" className="empty-state">No failed messages found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        <footer className="footer">
          <span>© 2026 StreamFlow · Kafka Event Publishing Platform</span>
          <span>Built with React & Apache Kafka</span>
        </footer>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
      <span className="stat-decoration">↗</span>
    </div>
  );
}

function Status({ status }) {
  const className = status.toLowerCase().replace(" ", "-");
  return <span className={`status ${className}`}>{status}</span>;
}

export default App;
