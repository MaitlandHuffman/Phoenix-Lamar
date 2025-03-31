import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PartsForm.css';

function PartsForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [query]);

  // Fetch results when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setMessage('');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/parts/search?query=${debouncedQuery}`);
        if (res.data.length === 0) {
          setMessage('No results found.');
          setResults([]);
        } else {
          setMessage('');
          setResults(res.data);
        }
      } catch (err) {
        setMessage('Error fetching parts.');
        console.error(err);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="parts-form-container">
      <h2>Search for a Part</h2>
      <input
        type="text"
        placeholder="Enter part number or keywords"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {message && <p>{message}</p>}

      {results.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>Part Number</th>
              <th>Description</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {results.map((part, i) => (
              <tr key={i}>
                <td>{part.partNumber}</td>
                <td>{part.description}</td>
                <td>${part.priceUSD.toFixed(2)}</td>
                <td>{part.supplier?.name}</td>
                <td>
                  <a href={part.supplier?.website} target="_blank" rel="noreferrer">🔗</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PartsForm;
