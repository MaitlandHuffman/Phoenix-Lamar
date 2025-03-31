import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PartsFormPage from './pages/PartsFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/parts" element={<PartsFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
