import { useState, useEffect } from "react";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [setMaxChar, setsetMaxChar] = useState(300);

  useEffect(() => {
    setsetMaxChar(300 - description.length);
  }, [description]);

  const handleChange = (e) => {
    if (e.target.localName === "input") {
      setTitle(e.target.value);
    } else if (e.target.localName === "textarea") {
      setDescription(e.target.value);
    }
  };

  return (
    <div
      className="h-screen w-screen fixed flex
     justify-center items-center z-10
    
     "
      style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
    >
      <div className="bg-white p-3 rounded-lg">
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
          <button className="w-full bg-indigo-700 text-white font-bold">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
