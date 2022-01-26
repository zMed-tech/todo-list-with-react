import { useState } from "react";

const Task = (props) => {
  const [finished, setFinished] = useState(false);
  const handleInputChange = () => {
    setFinished(!finished);
  };

  const deleteTask = () => {
    props.deleteTask(props.task.id);
  };
  return (
    <div className="flex justify-between border-y py-3">
      <div>
        <input
          type="checkbox"
          checked={finished}
          onChange={handleInputChange}
        />
        <span
          className={`mx-2 ${finished ? "line-through text-gray-500" : ""}`}
        >
          {props.task.name}
        </span>
      </div>
      <div>
        <button
          className="bg-indigo-400 
        text-white 
        font-bold 
        px-1
        mx-2
        "
        >
          Edit
        </button>
        <button
          onClick={deleteTask}
          className="bg-orange-500 
        text-white 
        font-bold 
        px-1"
        >
          Del
        </button>
      </div>
    </div>
  );
};

export default Task;
