import { useEffect, useState } from "react";

const useTime = (createAt: string) => {
  const [receivedTime, setReceivedTime] = useState<string>("");

  const receive = () => {
    const createTime = new Date(createAt).getTime();
    const currentTime = new Date().getTime();
    const diffTime = currentTime - createTime;

    const months = String(
      Math.floor((diffTime / (1000 * 60 * 60 * 24 * 30)) % 12)
    );
    const days = String(Math.floor((diffTime / (1000 * 60 * 60 * 24)) % 30));
    const hours = String(Math.floor((diffTime / (1000 * 60 * 60)) % 24));
    const minutes = String(Math.floor((diffTime / (1000 * 60)) % 60));

    if (months !== "0") {
      setReceivedTime(`${months}개월 전`);
    } else if (days !== "0") {
      setReceivedTime(`${days}일 전`);
    } else if (hours !== "0") {
      setReceivedTime(`${hours}시간 전`);
    } else if (minutes !== "0") {
      setReceivedTime(`${minutes}분 전`);
    } else {
      setReceivedTime("방금");
    }
  };

  useEffect(() => {
    receive();
    const timer = setInterval(receive, 60000); // 1분마다 receive 함수 호출

    return () => clearInterval(timer); // cleanup 함수로 타이머 해제
  }, [createAt]);

  return receivedTime;
};

export default useTime;
