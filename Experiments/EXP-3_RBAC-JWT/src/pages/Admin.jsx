function Admin() {
  return (
    <div className="page">
      <h1>Admin Panel</h1>

      <div className="info-card">
        <h2>Admin Access Granted</h2>
        <p>
          Only users with the Admin role can access
          this page.
        </p>
      </div>
    </div>
  );
}

export default Admin;