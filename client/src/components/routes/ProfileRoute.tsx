import GradePage from "page/profile/page/GradePage";
import LeafChargePage from "page/profile/page/LeafChargePage";
import LeafPage from "page/profile/page/LeafPage";
import OtherProfilePage from "page/profile/page/OtherProfilePage";
import ProfilePage from "page/profile/page/ProfilePage";
import { Navigate, Route, Routes } from "react-router-dom";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:nickname" element={<OtherProfilePage />} />
      <Route path="/profile/:nickname/my-grade" element={<GradePage />} />
      <Route path="/profile/my-leaf" element={<LeafPage />} />
      <Route path="/profile/my-leaf/charge" element={<LeafChargePage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default ProfileRoute;
