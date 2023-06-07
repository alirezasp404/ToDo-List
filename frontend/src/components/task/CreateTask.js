import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DescriptionInput from "./DescriptionInput";

function CreateTask() {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { user_id } = useParams();
  function handleSubmit(event) {
    event.preventDefault();

    if (description.length > 0 && description.length < 80) {
      axios
        .post("http://localhost:8081/create", { description, user_id })
        .then((res) => {
          console.log(res);
          navigate(`/home/${user_id}`);
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Task</h2>
          <DescriptionInput setDescription={setDescription} />
          <button className="btn btn-warning">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
