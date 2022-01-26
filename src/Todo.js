import { useState } from "react";
import Task from "./Task";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const handleInput = (e) => {
    setTask(e.target.value);
  };
  const [task, setTask] = useState("");
 

  return (
    <div className="my-4 flex flex-col bg-white h-full p-5 shadow shadow-gray">
      <div className="my-4 mx-auto">
        <span className="text-xl font-bold text-indigo-900">My Todo</span>
      </div>

      <div className="my-4 mb-8 border py-1">
        <input
          className="mx-4 outline-0"
          placeholder="My task for today"
          value={task}
          onChange={handleInput}
        />
        <button
          className="bg-indigo-500 
                            py-1 px-2 
                            text-white 
                            font-bold
                            rounded-sm
                            mr-1
                            "
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <div>
        <ul>
          {tasks.map((task, index) => {
            return <Task key={index} task={{ id: index, ...task }} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
