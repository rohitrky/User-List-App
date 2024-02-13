

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://swapi.dev/api/people?page=${currentPage}`);
      const data = await response.json();
      setUsers(data.results);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError('Error fetching data');
    }
  };
 
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <h1 >Star Wars Users</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div
          key={user.name}
          style={{
            border: '1px solid black',
            borderRadius: '12px',
            backgroundColor: user.hair_color,
            padding: '10px',
            margin: '10px'
          }}
        >
          <img src={`https://picsum.photos/200/200/?random`} alt="user" />
          <p><b>Name:</b> <span className={user.hair_color === 'black' ? 'white-text' : ''}>{user.name}</span></p>
          <p><b>Hair Color:</b> <span className={user.hair_color === 'black' ? 'white-text' : ''}>{user.hair_color}</span></p>
          <p><b>Skin Color:</b> {user.skin_color}</p>
          <p><b>Gender:</b> {user.gender}</p>
          <p><b>Vehicles Count:</b> {user.vehicles.length}</p>
        </div>
        ))}
      </div>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>
      </div>
    </div>
  );
};

export default App;
