import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import ChattingPage from "components/ChattingPage";
import HomePage from "components/HomePage";
import LibraryPage from "components/LibraryPage";
import LocationPage from "components/LocationPage";
import ProfilePage from "components/ProfilePage";
import Footer from "components/common/Footer";
import { Button } from "components/ui/button";

import "./App.css";

function App() {
  const [deviceType, setDeviceType] = useState<string>("");
  const [openType, setOpenType] = useState<string>("");
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const navigate = useNavigate();

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
    ["kapay", "ready", deviceType, openType],
    () => axios.get(`http://localhost:8080/api/v1/kapay/ready/${deviceType}/${openType}`),
    {
      enabled: !!deviceType && !!openType,
      onSuccess: (data) => {
        setRedirectUrl(data.data.data);
      },
    }
  );

  const handleClick = () => {
    if (redirectUrl) {
      if (deviceType === "pc") {
        // Open popup and set state to indicate it's opened
        const width = 426;
        const height = 510;
        const left = (window.innerWidth - width) / 2 + window.screenX;
        const top = (window.innerHeight - height) / 2 + window.screenY;

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
    <div className="App relative">
      <Button onClick={handleClick}>카카오페이 테스트</Button>

      {data && <div>Data loaded: {JSON.stringify(data.data)}</div>}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/chat" element={<ChattingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
