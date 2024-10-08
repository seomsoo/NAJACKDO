import { useMutation } from "@tanstack/react-query";
import { postSignOut } from "api/profileApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import { useUserStore } from "store/useUserStore";

const LogoutButton = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["signout"],
    mutationFn: postSignOut,

    onSuccess: () => {
      useUserStore.persist.clearStorage();
      useAuthStore.persist.clearStorage();
      navigate("/sign-in");
    },

    onError: (error) => {
      navigate("/profile");
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <button
      className="w-full h-[40px] my-6 bg-sub7 rounded-lg font-medium text-white"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
