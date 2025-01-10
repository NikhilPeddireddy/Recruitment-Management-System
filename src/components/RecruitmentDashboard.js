import React from "react";

const RecruitmentDashboard = ({ candidates, updateStage }) => {
  const stages = ["Application Received", "Interview Scheduled", "Offered", "Rejected"];

  const groupByStage = (stage) => candidates.filter((candidate) => candidate.stage === stage);

  return (
    <div className="mt-4">
      <h5 className="text-center mb-5">Recruitment Dashboard</h5>
      <div className="row">
        {stages.map((stage) => (
          <div key={stage} className="col-md-3 mb-4">
            <div className="card">
              <div className="card-header">{stage}</div>
              <ul className="list-group list-group-flush">
                {groupByStage(stage).map((candidate) => (
                  <li key={candidate.id} className="list-group-item">
                    {candidate.name} - {candidate.position}
                    {stage === "Application Received" && (
                      <>
                        <button
                          className="btn btn-success btn-sm ms-2"
                          onClick={() => updateStage(candidate.id, "Interview Scheduled")}
                        >
                          Schedule Interview
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => updateStage(candidate.id, "Rejected")}
                        >
                          Reject
                        </button>
                    
                      </>
                    )}
                    {stage === "Interview Scheduled" && (<>
                      <button
                          className="btn btn-warning btn-sm ms-2"
                          onClick={() => updateStage(candidate.id, "Offered")}
                        >
                          Offer Job
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => updateStage(candidate.id, "Rejected")}
                        >
                          Reject
                        </button>

                    </>)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentDashboard;
