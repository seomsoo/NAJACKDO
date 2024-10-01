import GradePage from "page/profile/page/GradePage";
import LeafChargePage from "page/profile/page/LeafChargePage";
import LeafPage from "page/profile/page/LeafPage";
import OtherProfilePage from "page/profile/page/OtherProfilePage";
import ProfilePage from "page/profile/page/ProfilePage";
import { Navigate, Route, Routes } from "react-router-dom";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/:nickname" element={<OtherProfilePage />} />
      <Route path="/:nickname/my-grade" element={<GradePage />} />
      <Route path="/my-leaf" element={<LeafPage />} />
      <Route path="/my-leaf/charge" element={<LeafChargePage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default ProfileRoute;
