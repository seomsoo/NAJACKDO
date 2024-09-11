import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const nav = useNavigate();
  return (
    <div>
      <h1>Main</h1>
      <div className="flex flex-col">
        <button onClick={() => nav("/login")}>login</button>
        <button onClick={() => nav("/bookdetail")}>bookdetail</button>
        <button onClick={() => nav("/bookdetail/rental")}>
          rentalbookdetail
        </button>
        <button onClick={() => nav("/bookdetail/mybook")}>
          myrentalbookdetail
        </button>
        <button onClick={() => nav("/apply")}>bookapply</button>
        <button onClick={() => nav("/ai-check")}>ai-check</button>
        <button onClick={() => nav("/ai-check/result")}>ai-check-result</button>
      </div>
    </div>
  );
};

export default MainPage;
