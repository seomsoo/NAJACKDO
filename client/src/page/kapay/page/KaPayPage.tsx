import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "components/ui/button";

const KapayPage = () => {
  const [deviceType, setDeviceType] = useState<string>("");
  const [openType, setOpenType] = useState<string>("");
  const [itemName, setItemName] = useState<string>("책잎");
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

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

    const detectedDeviceType = mobileDevices.some((device) => userAgent.match(device))
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
    <div>
      <h1>KaPay</h1>
      <Button onClick={() => payButtonClick("5000 책잎", 5000)}>5000 책잎 (5000원)</Button>
      <Button onClick={() => payButtonClick("10000 책잎", 10000)}>10000 책잎 (10000원)</Button>
      <Button onClick={() => payButtonClick("15000 책잎", 15000)}>15000 책잎 (15000원)</Button>
    </div>
  );
};

export default KapayPage;
