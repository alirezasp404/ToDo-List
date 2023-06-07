import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditTask() {
  const [description, setDescription] = useState("");
  const { taskID, id } = useParams();
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    if (description.length > 0) {
      axios
        .put("http://localhost:8081/edit/", { description, taskID })
        .then((res) => {
          console.log(res);
          navigate(`/home/${id}`);
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Edit Task</h2>
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
          <button className="btn btn-warning">Edit</button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
