import React, { useState } from 'react';

const SearchAndFilter = ({ candidates, setFilteredCandidates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('');

  const handleSearch = () => {
    let filtered = candidates;
    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCandidates(filtered);
  };
  const handleFilter = () => {
    let filtered = candidates;
    if (filterStage) {
      filtered = filtered.filter((candidate) => candidate.stage === filterStage);
    }
    
    setFilteredCandidates(filtered);
  };
  const handleReset = () => {
    setSearchTerm('');
    setFilterStage('');
    setFilteredCandidates(candidates);
  };

  return (
    <div className="mt-4 mb-4 d-flex flex-column flex-md-row justify-content-between">
      <input
        type="text"
        className="form-control mb-2 mb-md-0 me-4"
        placeholder="Search by name, email, or position"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary ms-2 me-2" onClick={handleSearch}>Search</button>
      <select
        className="form-select mb-2 mb-md-0"
        value={filterStage}
        onChange={(e) => setFilterStage(e.target.value)}
      >
        <option value="">Filter by stage</option>
        <option value="Application Received">Application Received</option>
        <option value="Interview Scheduled">Interview Scheduled</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button className="btn btn-primary ms-2" onClick={handleFilter}> Apply Filter</button>
      <button className="btn btn-dark ms-2" onClick={handleReset}> Reset</button>
      
    </div>
  );
};

export default SearchAndFilter;

