// src/components/UserCard.js
import React from 'react';
import axios from 'axios';

const UserCard = ({ user }) => {
  const { name, hair_color, skin_color, gender, vehicles } = user;

  // Generate a random picture link
  const randomPictureUrl = `https://picsum.photos/200/300?random=${Math.random()}`;

  return (
    <div className="user-card" style={{ backgroundColor: hair_color }}>
      <img src={randomPictureUrl} alt={`Random ${name}`} />
      <h3>{name}</h3>
      <p>
        <strong>Hair Color:</strong> {hair_color}
      </p>
      <p>
        <strong>Skin Color:</strong> {skin_color}
      </p>
      <p>
        <strong>Gender:</strong> {gender}
      </p>
      <p>
        <strong>Vehicles Count:</strong> {vehicles.length}
      </p>
    </div>
  );
};

export default UserCard;
