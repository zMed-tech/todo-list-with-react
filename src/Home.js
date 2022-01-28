import Todo from "./Todo";

const Home = () => {
  return (
    <div
      className="min-h-screen
                 flex justify-center 
                 bg-gradient-to-r
               from-indigo-300 
               to-indigo-400"
    >
      <Todo />
    </div>
  );
};

export default Home;
