function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="info-card">
        <h2>Secure Dashboard</h2>
        <p>
          This dashboard is protected by JWT authentication
          and RBAC authorization.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;