// src/components/UserList.js
import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.name} user={user} />
      ))}
    </div>
  );
};

export default UserList;
