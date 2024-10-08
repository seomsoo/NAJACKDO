import KapayPage from "page/kapay/page/KaPayPage";
import GradePage from "page/profile/page/GradePage";
import LeafPage from "page/profile/page/LeafPage";
import OtherProfilePage from "page/profile/page/OtherProfilePage";
import ProfilePage from "page/profile/page/ProfilePage";
import { Navigate, Route, Routes } from "react-router-dom";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/:nickname" element={<OtherProfilePage />} />
      <Route path="/:nickname/grade" element={<GradePage />} />
      <Route path="/my-leaf" element={<LeafPage />} />
      <Route path="/my-leaf/charge" element={<KapayPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default ProfileRoute;
