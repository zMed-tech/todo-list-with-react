import { useState } from "react";

const Task = (props) => {
  const [finished, setFinished] = useState(false);
  const handleChange = (e) => {
    if (e.target.id === "finished") {
      setFinished(!finished);
    }
  };

  return (
    <div className="flex flex-col border-y py-3">
      <div className="mx-auto">
        <span
          className={`text-2xl text-indigo-600 font-bold 
          ${finished ? "line-through" : "underline"}`}
        >
          {props.task.title}
        </span>
      </div>
      <div className="mb-5">
        <span className={`${finished ? "line-through" : ""}`}>
          {props.task.description}
        </span>
      </div>
      <div className="flex justify-end">
        <button
          id="finished"
          onClick={handleChange}
          className={`mx-2 ${finished ? "bg-red-500" : "bg-green-500"}
          text-white 
          font-bold 
          px-1`}
        >
          {finished ? "Unfinished" : "Finished"}
        </button>
        <button
          className="mx-2 bg-indigo-500 
        text-white 
        font-bold 
        px-1"
        >
          Edit
        </button>
        <button
          className="mx-2 bg-orange-500 
        text-white 
        font-bold 
        px-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
