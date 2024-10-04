import { useMutation } from "@tanstack/react-query";
import { postSignOut } from "api/profileApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";

const LogoutButton = () => {
  const clearTokens = useAuthStore.getState().clearTokens;
  const navigation = useNavigate();

  const mutation = useMutation({
    mutationKey: ["signout"],
    mutationFn: postSignOut,

    onSuccess: () => {
      clearTokens();
      navigation("/sign-in");
    },

    onError: (error) => {
      console.log(error, "로그아웃 실패");
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
