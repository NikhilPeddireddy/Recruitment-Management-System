import React from "react";
import SearchAndFilter from "./SearchAndFilter";

const CandidateList = ({ candidates, setFilteredCandidates, deleteCandidate }) => {
  return (
    <div className="mt-4">
      <h5 className="text-center mb-5">Candidate List</h5>

      <SearchAndFilter
        candidates={candidates}
        setFilteredCandidates={setFilteredCandidates}
      />

  
      {candidates.length === 0 ? (
        <p className="text-center text-muted">No candidates to display</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Stage</th>
              <th>Evaluation Status</th>
              <th>Resume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.position}</td>
                <td>{candidate.stage}</td>
                <td>
                  {candidate.evaluated ? (
                    <span
                      className={`badge ${
                        candidate.status === "Pass" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {candidate.status}
                    </span>
                  ) : (
                    <span className="text-warning">Not Evaluated</span>
                  )}
                </td>
                <td>
                  {candidate.resume ? (
                    <a
                      href={candidate.resume}
                      download={`${candidate.name}_resume`}
                      className="btn btn-primary btn-sm"
                    >
                      Download Resume
                    </a>
                  ) : (
                    <span className="text-muted">No Resume</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCandidate(candidate.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CandidateList;
