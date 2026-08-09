function Users() {
  return (
    <div className="page">
      <h1>User Management</h1>

      <div className="info-card">
        <h2>Admin Only</h2>

        <p>
          This section is available only to Admin users.
        </p>

        <ul>
          <li>View users</li>
          <li>Manage users</li>
          <li>Assign roles</li>
          <li>Remove users</li>
        </ul>
      </div>
    </div>
  );
}

export default Users;