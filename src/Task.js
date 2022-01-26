import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const deleteTask = gql`
  mutation deleteTask($deleteTaskId: ID) {
    deleteTask(id: $deleteTaskId) {
      id
    }
  }
`;

const Task = (props) => {
  const [finished, setFinished] = useState(false);
  const [mutateDeleteTask, { loading }] = useMutation(deleteTask);
  const handleChange = async (e) => {
    if (e.target.id === "finished") {
      setFinished(!finished);
    } else if (e.target.id === "delete") {
      await mutateDeleteTask({ variables: { deleteTaskId: props.task.id } });
      props.refetch();
    }
  };

  return (
    <div className="flex flex-col border-y py-3">
      {loading ? (
        <div>
          <span>Loading ...</span>
        </div>
      ) : (
        ""
      )}
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
          id="delete"
          onClick={handleChange}
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
