import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-screen h-10 border border-t-1 pt-3 flex flex-row justify-around">
      <Link to="/">홈</Link>
      <Link to="/location">내 주변</Link>
      <Link to="/library">서재</Link>
      <Link to="/chat">채팅</Link>
      <Link to="/profile">마이</Link>
    </footer>
  );
};

export default Footer;
