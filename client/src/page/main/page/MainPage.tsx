import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const nav = useNavigate();
  return (
    <div>
      <h1>Main</h1>
      <div className="flex flex-col">
        <button onClick={() => nav("/login")}>login</button>
        <button onClick={() => nav("/bookdetail")}>bookdetail</button>
      </div>
    </div>
  );
};

export default MainPage;
