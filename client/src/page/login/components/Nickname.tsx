import { useQuery } from "@tanstack/react-query";
import { availableNickname } from "api/profileApi";
import { Button } from "components/ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSurveyStore from "store/useSurveyStore";

const Nickname = () => {
  const { nickname, setNickname, avaliableNickname, setAvaliableNickname } =
    useSurveyStore();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { nickname: nickname },
  });

  const [nicknameToCheck, setNicknameToCheck] = useState<string | null>(null);

  const {
    data: availableNicknameData,
    isLoading: availableNicknameLoading,
    error: availableNicknameError,
    refetch: checkNickname,
  } = useQuery({
    queryKey: ["availableNickname"],
    queryFn: () => availableNickname(nicknameToCheck),
    enabled: false,
  });

  useEffect(() => {
    if (availableNicknameData !== undefined) {
      setAvaliableNickname(availableNicknameData);
    }
  }, [availableNicknameData, setAvaliableNickname]);

  useEffect(() => {
    if (nicknameToCheck !== null) {
      checkNickname();
    }
  }, [nicknameToCheck, checkNickname]);

  const onSubmit = (data: { nickname: string }) => {
    setNickname(data.nickname);
    setNicknameToCheck(data.nickname);
  };

  return (
    <div className="flex flex-col items-center text-2xl py-8 font-semibold">
      <header>닉네임을 입력해 주세요.</header>
      <div className="text-[#737373] font-light mt-4 text-xs flex flex-col items-center">
        <span>닉네임은 나중에 언제든지 바꿀 수 있어요.</span>
        <span>공백 없이 8자 이하, 기호는 -_. 만 사용 가능합니다.</span>
        <span>닉네임은 중복 불가입니다.</span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16 flex flex-col items-center"
      >
        <input
          type="text"
          className="text-5xl text-center bg-transparent focus:outline-none focus:border-none placeholder:text-sub6 text-sub6"
          {...register("nickname")}
          placeholder="닉네임"
        />
        <Button type="submit" className="mt-8 bg-sub8 hover:bg-sub2 text-white">
          중복 확인
        </Button>
      </form>

      {avaliableNickname !== null && (
        <div className="mt-4 text-lg">
          {avaliableNickname ? (
            <span className="text-green-500">사용 가능한 닉네임입니다.</span>
          ) : (
            <span className="text-red-500">
              닉네임이 중복되어 사용 불가합니다.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Nickname;
