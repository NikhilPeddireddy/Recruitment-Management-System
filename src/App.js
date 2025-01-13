import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import RecruitmentDashboard from "./components/RecruitmentDashboard";
import SkillEvaluation from "./components/SkillEvaluation";
import mockData from "./data/mockData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [candidates, setCandidates] = useState(mockData);
  const [filteredCandidates, setFilteredCandidates] = useState(mockData);

  const addCandidate = (candidate) => {
    setCandidates((prevCandidates) => [...prevCandidates, candidate]);
    setFilteredCandidates((prevCandidates) => [...prevCandidates, candidate]);
    toast.success("Candidate Added Successfully");
  };

  const updateStage = (id, newStage) => {
    const candidateToUpdate = candidates.find((candidate) => candidate.id === id);
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === id ? { ...candidate, stage: newStage } : candidate
    );
    setCandidates(updatedCandidates);
    setFilteredCandidates(updatedCandidates);
    toast.info(`${newStage} for ${candidateToUpdate.name}.`);
  };

  const deleteCandidate = (id) => {
    const candidateToDelete = candidates.find((candidate) => candidate.id === id);
    const updatedCandidates = candidates.filter((candidate) => candidate.id !== id);
    setCandidates(updatedCandidates);
    setFilteredCandidates(updatedCandidates);
    toast.error(`Deleted ${candidateToDelete.name}`);
  };

  const updateEvaluation = (id, score, status) => {
    const candidateToEvaluate = candidates.find((candidate) => candidate.id === id);
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === id
        ? { ...candidate, score, status, evaluated: true }
        : candidate
    );
    setCandidates(updatedCandidates);
    setFilteredCandidates(updatedCandidates);
    toast.info(`Evaluated ${candidateToEvaluate.name}`);
  };

  return (
    <Router>
      <div className="container mt-4 shadow-lg p-3 mb-5 bg-white rounded">
        <h1 className="text-center mb-4 text-danger bg-warning fw-bold text-shadow">
          Recruitment Management System
        </h1>
        <ToastContainer />
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Home
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/candidates">
                    Candidates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/evaluate">
                    Evaluate Candidates
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<CandidateForm addCandidate={addCandidate} />} />
          <Route
            path="/candidates"
            element={
              <CandidateList
                candidates={filteredCandidates}
                setFilteredCandidates={setFilteredCandidates}
                deleteCandidate={deleteCandidate}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <RecruitmentDashboard
                candidates={candidates}
                updateStage={updateStage}
              />
            }
          />
          <Route
            path="/evaluate"
            element={
              <div>
                <h4 className="text-center">Evaluate Candidates</h4>
                {candidates.length>0? candidates
                  .filter((candidate) => !candidate.evaluated)
                  .map((candidate) => (
                    <SkillEvaluation
                      key={candidate.id}
                      candidate={candidate}
                      updateEvaluation={updateEvaluation}
                    />
                  )): <p className="text-center text-muted">No candidates to evaluate</p>}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
