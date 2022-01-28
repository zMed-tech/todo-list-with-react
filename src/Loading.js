import { useSelector } from "react-redux";

const Loading = () => {
  const { loading } = useSelector((state) => state.loading);

  return loading ? (
    <div
      className="h-screen w-screen
fixed flex justify-center 
items-center z-20 bg-blackTransparent"
    >
      <div className="bg-red-500 h-1 w-10 animate-spin"></div>
    </div>
  ) : (
    ""
  );
};

export default Loading;
