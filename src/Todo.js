const Todo = () => {
  return (
    <div className="my-2 flex flex-col bg-white h-full p-5 shadow shadow-gray">
      <div className="my-4 mx-auto">
        <span className="text-xl font-bold text-indigo-900">My Todo</span>
      </div>

      <div className="my-4 border py-1">
        <input className="mx-4 outline-0" placeholder="My task for today" />
        <button
          className="bg-indigo-500 
                            py-1 px-2 
                            text-white 
                            font-bold
                            rounded-sm
                            mr-1
                            "
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Todo;
