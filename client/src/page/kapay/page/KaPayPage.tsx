// src/page/kapay/page/KapayPage.tsx
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
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

  const { data, error, isLoading } = useQuery(
    ["kapay", "ready", deviceType, openType, itemName, totalAmount],
    () =>
      axios.get(`http://localhost:8080/api/v1/kapay/ready/${deviceType}/${openType}`, {
        params: {
          itemName,
          totalAmount,
        },
      }),
    {
      enabled: !!deviceType && !!openType && totalAmount !== null,
      onSuccess: (data) => {
        setRedirectUrl(data.data.data);
      },
    }
  );

  const payButtonClick = (itemName: string, amount: number) => {
    setItemName(itemName);
    setTotalAmount(amount);
    if (redirectUrl) {
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

        if (popup) {
          popup.location.href = redirectUrl;
        } else {
          console.error("Popup을 열 수 없습니다!");
        }
      } else {
        window.location.replace(redirectUrl);
      }
    } else {
      console.error("Redirect URL is not set.");
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
