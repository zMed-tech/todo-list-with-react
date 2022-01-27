import { useMutation, gql } from "@apollo/client";

const deleteTask = gql`
  mutation deleteTask($deleteTaskId: ID) {
    deleteTask(id: $deleteTaskId) {
      id
    }
  }
`;

const updateTask = gql`
  mutation updateTask(
    $updateTaskId: ID
    $title: String
    $description: String
    $finished: Boolean
    $createdAt: String
    $finishedAt: String
    $updateAt: String
  ) {
    updateTask(
      id: $updateTaskId
      title: $title
      description: $description
      finished: $finished
      created_at: $createdAt
      finished_at: $finishedAt
      update_at: $updateAt
    ) {
      id
    }
  }
`;

const Task = (props) => {
  const [mutateDeleteTask, { loading }] = useMutation(deleteTask);
  const [mutateUpdateTask, { loading: loadUpdate }] = useMutation(updateTask);

  const handleChange = async (e) => {
    if (e.target.id === "finished") {
      await mutateUpdateTask({
        variables: {
          updateTaskId: props.task.id,
          finished: !props.task.finished,
        },
      });
      props.refetch();
    } else if (e.target.id === "delete") {
      await mutateDeleteTask({ variables: { deleteTaskId: props.task.id } });
      props.refetch();
    }
  };

  return (
    <div className="flex flex-col border-y py-3">
      {loading || loadUpdate ? (
        <div>
          <span>Loading ...</span>
        </div>
      ) : (
        ""
      )}
      <div className="mx-auto">
        <span
          className={`text-2xl text-indigo-600 font-bold 
          ${props.task.finished ? "line-through" : "underline"}`}
        >
          {props.task.title}
        </span>
      </div>
      <div className="mb-5">
        <span className={`${props.task.finished ? "line-through" : ""}`}>
          {props.task.description}
        </span>
      </div>
      <div className="flex justify-end">
        <button
          id="finished"
          onClick={handleChange}
          className={`mx-2 ${
            props.task.finished ? "bg-red-500" : "bg-green-500"
          }
          text-white 
          font-bold 
          px-1`}
        >
          {props.task.finished ? "Unfinished" : "Finished"}
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
