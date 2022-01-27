import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenEdit, setMakeRefetch } from "./store/reducers/task";
import { setLoading } from "./store/reducers/loading";
import { useMutation, gql } from "@apollo/client";

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

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [setMaxChar, setsetMaxChar] = useState(300);
  const { openEdit, id, makeRefetch } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const [mutateUpdateTask] = useMutation(updateTask);

  useEffect(() => {
    setsetMaxChar(300 - description.length);
  }, [description]);

  const handleChange = async (e) => {
    if (e.target.localName === "input") {
      setTitle(e.target.value);
    } else if (e.target.localName === "textarea") {
      setDescription(e.target.value);
    } else if (e.target.id === "edit") {
      if (title !== "" && description !== "") {
        dispatch(setLoading(true));
        await mutateUpdateTask({
          variables: {
            updateTaskId: id,
            title,
            description,
            updateAt: Date.now() + "",
          },
        });
        dispatch(setLoading(false));
        setTitle("");
        setDescription("");
        dispatch(setOpenEdit(false));
        dispatch(setMakeRefetch(!makeRefetch));
      }
    }
  };

  return openEdit ? (
    <div
      className="h-screen w-screen fixed flex
 justify-center items-center z-10
  bg-blackTransparent
 "
    >
      <div className="bg-white p-3 rounded-lg">
        <div className="flex justify-end mb-2">
          <button
            className="bg-red-600 text-white font-bold rounded-xl px-2"
            onClick={() => dispatch(setOpenEdit(false))}
          >
            Close
          </button>
        </div>
        <div className="border p-1">
          <input
            className="outline-0"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="border p-1 my-2 relative">
          <textarea
            className="outline-0"
            rows={7}
            cols={45}
            maxLength={300}
            placeholder="Description"
            value={description}
            onChange={handleChange}
          ></textarea>
          <span className="absolute bottom-1 right-1 text-indigo-400">
            {" "}
            {setMaxChar}{" "}
          </span>
        </div>
        <div className="">
          <button
            id="edit"
            className="w-full bg-indigo-700 text-white font-bold"
            onClick={handleChange}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditTask;
