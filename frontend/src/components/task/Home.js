import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import TaskList from "./TaskList";

function Home() {
  const [task, setTask] = useState([]);
  const { user_id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8081/user/" + user_id)
      .then((res) => setTask(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className=" w-75 bg-white rounded p-3">
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/create/${user_id}`} className="btn btn-warning mb-3 me-3">
            Add Task
          </Link>
          <div className="d-flex justify-content-center pt-2 pb-2">
            <h1 className="todoTitle">ToDo</h1>
          </div>
          <Link to={"/"} className="btn btn-outline-warning mb-3 ">
            Log Out
          </Link>
        </div>
        <TaskList task={task} id={user_id} />
      </div>
    </div>
  );
}

export default Home;
