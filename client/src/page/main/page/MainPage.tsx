import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const nav = useNavigate();
  return (
    <div>
      <h1>Main</h1>
      <button onClick={() => nav("/login")}>login</button>
    </div>
  );
};

export default MainPage;
