import React, { useState } from "react";
import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import RecruitmentDashboard from "./components/RecruitmentDashboard";
import SkillEvaluation from "./components/SkillEvaluation";
import SearchAndFilter from "./components/SearchAndFilter";
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

    const updatedCandidates = candidates
      .map((candidate) =>
        candidate.id === id ? { ...candidate, stage: newStage } : candidate
      )
      
    setCandidates(updatedCandidates);
    setFilteredCandidates(updatedCandidates);
    toast.info(` ${newStage} for ${candidateToUpdate.name}.`);
  };

  const deleteCandidate = (id) => {
    const candidateToDelete = candidates.find((candidate) => candidate.id === id);
    const filteredCandidates = candidates.filter((candidate) => candidate.id !== id);
    setCandidates(filteredCandidates);
    setFilteredCandidates(filteredCandidates);
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
    console.log(updatedCandidates);
    toast.info(`Evaluated ${candidateToEvaluate.name} `);
  };

  return (
    <div className="container mt-4 shadow-lg p-3 mb-5 bg-white rounded">
      <h1 className="text-center mb-4 text-danger bg-warning fw-bold text-shadow">Recruitment Management System</h1>
      <ToastContainer />
      <div className=" m-5">
        <CandidateForm addCandidate={addCandidate} />
      </div>
      <div className="w-100 my-4 shadow-sm p-3 bg-white rounded"></div>
      <div className=" m-5">
        <SearchAndFilter candidates={candidates} setFilteredCandidates={setFilteredCandidates} />
      </div>
      
      <div className="m-5">
        <CandidateList
          candidates={filteredCandidates}
          deleteCandidate={deleteCandidate}
        />
      </div>
      <div className="w-100 my-4 shadow-sm p-3 bg-white rounded"></div>
       {candidates.length>0 && (
          <div className="mb-4">
          <h4 className="text-center">Evaluate Candidates</h4>
            {candidates
              .filter((candidate) => !candidate.evaluated)
              .map((candidate) => (
                <SkillEvaluation
                  key={candidate.id}
                  candidate={candidate}
                  updateEvaluation={updateEvaluation}
                />
              ))}
          </div>
       )}
      
      <div className="w-100 my-4 shadow-sm p-3 bg-white rounded"></div>
      <div className=" m-5">
        <RecruitmentDashboard candidates={candidates} updateStage={updateStage} />
      </div>
 
    </div>
  );
};

export default App;
