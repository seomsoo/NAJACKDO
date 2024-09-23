import axios from "axios";
import { Button } from "components/ui/button";
import { useEffect, useState } from "react";
import { IoIosLeaf } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const KapayPage = () => {
  const navigate = useNavigate();

  const [deviceType, setDeviceType] = useState<string | undefined>();
  const [openType, setOpenType] = useState<string | undefined>();
  const [itemName, setItemName] = useState<string>("책잎");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [_, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    const mobileDevices = [
      /android/i,
      /webos/i,
      /iphone/i,
      /ipad/i,
      /ipod/i,
      /blackberry/i,
      /windows phone/i,
    ];

    const detectedDeviceType = mobileDevices.some((device) =>
      userAgent.match(device)
    )
      ? "mobile"
      : "pc";

    setDeviceType(detectedDeviceType);
    setOpenType(detectedDeviceType === "mobile" ? "redirect" : "popup");
  }, []);

  const payButtonClick = async (itemName: string, amount: number) => {
    setItemName(itemName);
    setTotalAmount(amount);

    try {
      const response = await axios.get(
        `https://www.najackdo.kro.kr/api/v1/kapay/ready/${deviceType}/${openType}`,
        {
          params: {
            itemName,
            totalAmount: amount,
          },
        }
      );

      const redirectUrl = response.data.data;
      setRedirectUrl(redirectUrl);

      if (!redirectUrl) {
        console.error("Redirect URL이 설정되지 않았습니다.");
        return;
      }

      if (deviceType === "pc") {
        const width = 426;
        const height = 510;
        const left = (window.innerWidth - width) / 3;
        const top = (window.innerHeight - height) / 2;

        const popup = window.open(
          "",
          "paypopup",
          `width=${width},height=${height},left=${left},top=${top},toolbar=no`
        );

        if (!popup) {
          console.error("Popup을 열 수 없습니다!");
          return;
        }

        popup.location.href = redirectUrl;
        return;
      }

      window.location.replace(redirectUrl);
    } catch (error) {
      console.error("결제 준비 요청 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div className="mx-[25px]">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer py-4 flex flex-row items-center"
      >
        <IoChevronBack size={25} color="#545454" />
      </div>
      <p className="font-bold text-xl my-4">
        <span className="text-[22px] text-[#79AC78]">책잎</span> 충전하기
      </p>
      <div>
        <div className="flex flex-row items-center mt-10">
          <IoIosLeaf color="#79AC78" size={29} className="mx-2" />
          <p className="font-bold text-xl text-end">
            <span className="text-[#776B5D] text-2xl">책잎</span> 으로
          </p>
        </div>
        <p className="mx-2 my-6 pl-4 bg-white/50 font-bold h-10 flex items-center rounded-xl">
          {totalAmount.toLocaleString()} 원
        </p>
        <div className="flex flex-row justify-evenly">
          {[5000, 10000, 15000].map((amount) => (
            <Button
              key={amount}
              className="bg-[#B0A695] hover:bg-[#776B5D]"
              onClick={() => payButtonClick(`${amount} 책잎`, amount)}
            >
              {amount.toLocaleString()}원
            </Button>
          ))}
        </div>
        <p className="bg-[#776B5D] rounded-xl text-white h-10 flex items-center justify-center mt-16">
          충전하기
        </p>
      </div>
    </div>
  );
};

export default KapayPage;
