import { useState, useEffect } from "react";
import Task from "./Task";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "./store/reducers/loading";

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

const addTask = gql`
  mutation addTask(
    $title: String
    $description: String
    $finished: Boolean
    $createdAt: String
  ) {
    newTask(
      title: $title
      description: $description
      finished: $finished
      created_at: $createdAt
    ) {
      id
    }
  }
`;

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxChar, setMaxChar] = useState(300);
  const { data: dataTasks, loading, refetch } = useQuery(getTasks);
  const [mutateAddTask] = useMutation(addTask);
  const { makeRefetch } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading, dispatch]);

  useEffect(() => {
    setMaxChar(300 - description.length);
  }, [description]);

  useEffect(() => {
    refetch();
  }, [makeRefetch, refetch]);

  const handleChange = async (e) => {
    if (e.target.localName === "input") {
      setTitle(e.target.value);
    } else if (e.target.localName === "textarea") {
      setDescription(e.target.value);
    } else {
      if (title !== "" && description !== "") {
        dispatch(setLoading(true));
        const now = Date.now();
        await mutateAddTask({
          variables: {
            title,
            description,
            finished: false,
            createdAt: now + "",
          },
        });
        setTitle("");
        setDescription("");
        refetch();
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className="my-4 flex flex-col bg-white h-full p-5 shadow shadow-gray">
      <div className="my-4 mx-auto">
        <span className="text-xl font-bold text-indigo-900">My Todo</span>
      </div>

      <div className="my-4  border py-1 px-2">
        <input
          className="outline-0 w-full"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="relative">
        <textarea
          className="border w-full outline-0 px-2"
          placeholder="description"
          cols={45}
          rows={7}
          maxLength={300}
          value={description}
          onChange={handleChange}
        ></textarea>
        <span className="absolute right-2 bottom-2 text-indigo-400">
          {" "}
          {maxChar}{" "}
        </span>
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
        onClick={handleChange}
      >
        Add
      </button>
      <div>
        <ul>
          {dataTasks?.tasks.map((task) => {
            return <Task key={task.id} task={task} refetch={refetch} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
