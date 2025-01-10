import React, { useState } from "react";

const SkillEvaluation = ({ candidate, updateEvaluation }) => {
  const [score, setScore] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score >= 0 && score <= 100) {
      const status = score >= 50 ? "Pass" : "Fail";  
      updateEvaluation(candidate.id, score, status);  
    } else {
      setError("Score must be between 0 and 100.");
    }
  };

  return (
    <div className="mt-3">
      <h5>Skill Evaluation for {candidate.name}</h5>
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          type="number"
          className="form-control me-2"
          placeholder="Enter score (0-100)"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          min={0}
          max={100}
        />
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default SkillEvaluation;