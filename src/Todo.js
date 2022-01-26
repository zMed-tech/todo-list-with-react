import { useState } from "react";
import Task from "./Task";
import { useQuery, gql } from "@apollo/client";

const getTasks = gql`
  query getTasks {
    tasks {
      id
      title
      description
      finished
      created_at
      finished_at
      update_at
    }
  }
`;

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { loading: loadGetTasks, data: dataTasks } = useQuery(getTasks);
  console.log(dataTasks);

  const handleInput = (e) => {
    if (e.target.localName === "input") {
      setTitle(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const addTask = () => {
    if (title !== "" && description !== "") {
      console.log(title);
      console.log(description);
    }
  };

  return (
    <div className="my-4 flex flex-col bg-white h-full p-5 shadow shadow-gray">
      {loadGetTasks && (
        <div>
          <span>Loading ...</span>{" "}
        </div>
      )}
      <div className="my-4 mx-auto">
        <span className="text-xl font-bold text-indigo-900">My Todo</span>
      </div>

      <div className="my-4  border py-1 px-2">
        <input
          className="outline-0"
          placeholder="Title"
          value={title}
          onChange={handleInput}
        />
      </div>
      <div>
        <textarea
          className="border w-full outline-0 px-2"
          placeholder="description"
          cols={45}
          rows={7}
          value={description}
          onChange={handleInput}
        ></textarea>
      </div>
      <button
        className="bg-indigo-500 
                            py-1 px-2 
                            text-white 
                            font-bold
                            rounded-sm
                            mr-1
                            my-2
                            "
        onClick={addTask}
      >
        Add
      </button>
      <div>
        <ul></ul>
      </div>
    </div>
  );
};

export default Todo;
