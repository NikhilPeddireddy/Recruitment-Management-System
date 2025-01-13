import React, { useState, useRef } from "react";

const CandidateForm = ({ addCandidate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });
  const [resume, setResume] = useState(null); 
  const fileInputRef = useRef(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResumeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload a resume.");
      return;
    }

  
    const newCandidate = {
      ...formData,
      id: Date.now(),
      resume: URL.createObjectURL(resume),
      stage: "Application Received",
      evaluated: false, 
    };

    addCandidate(newCandidate); 
    setFormData({ name: "", email: "", phone: "", position: "" }); 
    setResume(null); 

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h5>Add New Candidate</h5>
      <div className="row g-3 d-flex flex-column vw-100">
        <div className="col-md-3 w-75 p-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3 w-75 p-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          /> 
        </div>
        <div className="col-md-3 w-75 p-3">
          <input
            type="text"
            name="phone"
            minLength={10}
            maxLength={10}
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3 w-75 p-3">
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3 w-75 p-3">
          <label className="form-label">Resume</label>
          <input
            type="file"
            className="form-control"
            onChange={handleResumeChange} 
            ref={fileInputRef} 
            required
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary">Add Candidate</button>
        </div>
      </div>
    </form>
  );
};

export default CandidateForm;
