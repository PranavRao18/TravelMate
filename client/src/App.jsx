// my-react-app/src/App.jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Vite React App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && <p>Data from Express: {data.message}</p>
      )}
    </div>
  );
}


export default App;
