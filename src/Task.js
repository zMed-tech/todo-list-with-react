import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setOpenEdit, setId } from "./store/reducers/task";
import { setLoading } from "./store/reducers/loading";

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
  const [mutateDeleteTask] = useMutation(deleteTask);
  const [mutateUpdateTask] = useMutation(updateTask);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    if (e.target.id === "finished") {
      if (!props.task.finished) {
        dispatch(setLoading(true));
        const now = Date.now();
        await mutateUpdateTask({
          variables: {
            updateTaskId: props.task.id,
            finished: !props.task.finished,
            finishedAt: now + "",
          },
        });
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(true));
        await mutateUpdateTask({
          variables: {
            updateTaskId: props.task.id,
            finished: !props.task.finished,
            finishedAt: null,
          },
        });
        dispatch(setLoading(false));
      }

      props.refetch();
    } else if (e.target.id === "delete") {
      dispatch(setLoading(true));
      await mutateDeleteTask({ variables: { deleteTaskId: props.task.id } });
      dispatch(setLoading(false));
      props.refetch();
    } else {
      dispatch(setOpenEdit(true));
      dispatch(setId(props.task.id));
    }
  };

  return (
    <div className="flex flex-col border-y py-3">
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
          onClick={handleChange}
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
