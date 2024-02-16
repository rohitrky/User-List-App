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

  const generateRandomQueryParam = () => {
    return `random=${Math.floor(Math.random() * 1000000)}`;
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <h1 style={{ fontFamily: '"Protest Guerrilla", sans-serif', color: 'white', letterSpacing: '1.3px', fontSize: '62px' }}>
        Star Wars Users
      </h1>
      <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
      {loading && <p style={{fontSize: '25px', color: 'white', fontWeight: '700', letterSpacing: '2px'}}>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div
            key={user.name}
            style={{
              borderRight: '0.1px solid white',
              borderBottom: '0.1px solid white',
              borderRadius: '12px',
              backgroundColor: user.hair_color,
              backdropFilter: 'blur(10px)',
              padding: '10px',
              margin: '10px',
            }}
          >
            <img src={`https://picsum.photos/200/200/?${generateRandomQueryParam()}`} alt="user" />
            <h2 style={{ fontFamily: '"Protest Guerrilla", sans-serif', letterSpacing: '1.3px' }}>
              <b>Name:</b> {user.name}
            </h2>
            <div className="card-content">
              <p>
                <b>Hair Color:</b> {user.hair_color}
              </p>
              <p>
                <b>Skin Color:</b> {user.skin_color}
              </p>
            </div>
            <div className="card-content">
              <p>
                <b>Gender:</b> {user.gender}
              </p>
              <p>
                <b>Vehicles Count:</b> {user.vehicles.length}
              </p>
            </div>
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
