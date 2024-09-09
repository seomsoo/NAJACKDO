import { useNavigate } from "react-router-dom";

const LocationPage = () => {
  const navigate = useNavigate();
  const goToLocationSetting = () => {
    navigate('/location/setting');
  };
  return (
    <div>
      <h1>Location</h1>
      <button onClick={goToLocationSetting}>임시임시 지역 설정 </button>

    </div>
  );
};

export default LocationPage;
