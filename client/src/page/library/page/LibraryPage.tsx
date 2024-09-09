import { useNavigate } from 'react-router-dom';

const LibraryPage = () => {
  const navigate = useNavigate();
  const goToMyFavorite = () => {
    navigate('/library/my-favorite');
  };

  return (
    <div>
      <h1>Library</h1>
      <button onClick={goToMyFavorite}>임시임시 좋아요를 여기 없어</button>
    </div>
  );
};

export default LibraryPage;
