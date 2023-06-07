import React from "react";

function DescriptionInput({ setDescription }) {
  return (
    <div className="mb-3">
      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        placeholder="Enter Description"
        className="form-control"
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}

export default DescriptionInput;
