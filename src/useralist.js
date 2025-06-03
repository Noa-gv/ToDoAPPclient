import React from 'react';

function Users({ users, loading }) {
  return (
    <section className="user-list">
      <header className="header">
        <h2>Users</h2>
      </header>
      <section className="main" style={{ display: "block" }}>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <ul>
            {Array.isArray(users) &&
              users.map(user => (
                <li key={user.idusers}>
                  <span>{user.nameUser}</span>
                </li>
              ))}
          </ul>
        )}
      </section>
    </section>
  );
}

export default Users;
