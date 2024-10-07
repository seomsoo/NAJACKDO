import Error from "components/common/Error";
import Loading from "components/common/Loading";
import LogoutButton from "page/profile/components/LogoutButton";
import MyLeaf from "page/profile/components/MyLeaf";
import UserProfile from "page/profile/components/UserProfile";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const ProfilePage = () => (
  <div className="mx-[25px] my-4">
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <UserProfile />
      </Suspense>
    </ErrorBoundary>

    {/* 나의 책잎 */}
    <MyLeaf />

    {/* 로그아웃 버튼 */}
    <LogoutButton />
  </div>
);

export default ProfilePage;
