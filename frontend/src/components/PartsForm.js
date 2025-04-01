// PartsForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/PartsForm.css';

function PartsForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const searchRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

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
          if (searchRef.current) {
            searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } catch (err) {
        setMessage('Error fetching parts.');
        console.error(err);
      }
    };
    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="parts-page-full">
      <div className="nav-bar">
        <button className="nav-btn">Old Quotes</button>
        <button className="nav-btn">Current Quote</button>
        <button className="nav-btn logout">Log Out</button>
      </div>

      <div className="search-bar" ref={searchRef}>
        <input
          type="text"
          placeholder="Search part number or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn">Submit</button>
      </div>

      <div className="main-content">
        <div className="filter-sidebar">
          <h3>Filter</h3>
          <p>(Coming Soon)</p>
        </div>

        <div className="results-section">
          {message && <p className="message-text">{message}</p>}
          <div className="product-cards">
            {results.map((part, i) => (
              <div className="product-card" key={i}>
                <div className="card-header">
                  <h4 className="part-number">{part.partNumber}</h4>
                  <p className="price">${part.priceUSD?.toFixed(2)}</p>
                </div>
                <p className="description">{part.description}</p>
                <p className="availability">Availability: {part.availability}</p>
                <p className="supplier">Supplier: <strong>{part.supplier?.name}</strong></p>
                <a href={part.url} target="_blank" rel="noreferrer" className="view-link">🔗 View Part</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartsForm;
