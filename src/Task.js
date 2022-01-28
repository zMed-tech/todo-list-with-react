import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setOpenEdit, setId } from "./store/reducers/task";
import { setLoading } from "./store/reducers/loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localized from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime);
dayjs.extend(localized);

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

  const formatDate = (timestamp) => {
    return dayjs(Number(timestamp)).fromNow();
  };

  const formatDateFriendly = (timestamp) => {
    return dayjs(Number(timestamp)).format("llll");
  };

  return (
    <div className="flex flex-col border-y py-3 relative">
      <span
        className="absolute right-0"
        title={formatDateFriendly(props.task.created_at)}
      >
        {formatDate(props.task.created_at)}{" "}
      </span>

      <div className="mx-auto">
        <span
          className={`text-2xl text-indigo-600 font-bold 
          ${props.task.finished ? "line-through" : "underline"}`}
        >
          {props.task.title}
        </span>
      </div>
      <div className="mb-5 max-w-md break-words">
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
      <span
        className="text-green-500"
        title={formatDateFriendly(props.task.finished_at)}
      >
        {" "}
        {props.task.finished_at
          ? " finished : " + formatDate(props.task.finished_at)
          : ""}{" "}
      </span>
      <span
        className="text-indigo-600"
        title={formatDateFriendly(props.task.update_at)}
      >
        {props.task.update_at
          ? " updated : " + formatDate(props.task.update_at)
          : ""}{" "}
      </span>
    </div>
  );
};

export default Task;
