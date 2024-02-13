// src/components/UserList.js
import React from 'react';

const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
