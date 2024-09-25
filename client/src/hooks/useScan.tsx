import Quagga from "@ericblade/quagga2";
import useToggle from "hooks/useToggle";
import { useEffect, useState } from "react";

// ISBN 정규 표현식
const ISBN_REGEX = /[0-9]{10,13}/;

// quagga init config
interface Constraints {
  deviceId?: string;
  facingMode?: string;
  focusMode?: string;
}

const computeCameraConfig = (cameraId) => {
  console.log("quagga init");
  try {
    const supportedConstraints =
      navigator.mediaDevices.getSupportedConstraints() || [];

    const config = {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#interactive") as HTMLVideoElement,
        constraints: {} as Constraints,
        area: {
          top: "30%",
          right: "10%",
          left: "10%",
          bottom: "30%",
        },
      },
      frequency: 40, // 40ms마다 스캔 시도
      decoder: {
        readers: ["ean_reader"],
      },
      locate: false, // 바코드를 자동으로 찾을 지 여부 -> 우리는 네모칸 안으로 들어와야 스캔
    };

    // 카메라 id 설정
    if (cameraId) config.inputStream.constraints.deviceId = cameraId;

    // 후면 카메라 사용하도록 설정
    if ("facingMode" in supportedConstraints)
      config.inputStream.constraints.facingMode = "environment";

    // 초점 자동으로 맞추도록 설정
    if ("focusMode" in supportedConstraints)
      config.inputStream.constraints.focusMode = "continuous";

    console.log("quagga init config");
    return config;
  } catch (error) {
    console.log("quagga init error", error);
  }
};

// 선호하는 카메라 설정
const preferredCamera = {
  audio: false,
  video: {
    facingMode: "environment",
  },
};

// 카메라 접근 요청
const getBestSuitedCameraId = () => {
  console.log("카메라 접근 요청");
  try {
    return navigator.mediaDevices
      .getUserMedia(preferredCamera)
      .then((response) => {
        const videoTracks = response.getVideoTracks();
        if (videoTracks?.length) {
          return videoTracks[0].getSettings().deviceId;
        }
      });
  } catch (error) {
    throw new Error("카메라 접근에 실패하였습니다", error);
  }
};

const useScan = () => {
  const [cameraId, setCameraId] = useState<string>("");
  const [cameras, setCameras] = useState<string[]>([]);
  const [activeVideoTrack, setActiveVideoTrack] = useState(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [result, setResult] = useState(null);
  const [hasLight, setHasLight] = useState<boolean>(false);
  const { isOn: lightIsOn, toggle, setIsOn } = useToggle();

  const scan = async () => {
    try {
      const resultSet = [];
      let config = null;

      if (cameraId) {
        console.log("초기 카메라 있음", cameraId);
        config = computeCameraConfig(cameraId);
      } else {
        console.log("초기 카메라 없음, 새로운 카메라 선택");
        // 사용자가 카메라를 선택하지 않았거나 접근 불가능한 경우
        const initialCameraId = await getBestSuitedCameraId();
        setCameraId(initialCameraId);
        config = computeCameraConfig(initialCameraId);
      }

      setIsScanning(true);
      console.log("스캔 시작");

      await Quagga.init(config, (error) => {
        if (error) {
          console.log(error);
          setIsScanning(false);
          throw new Error("카메라 초기 설정 실패", error);
        } else {
          console.log("quagga init 완료");
          Quagga.start();
          setAllCamera();
          handleSetCameraLight();
        }
      });
      console.log("바코드 스캔 시작");
      Quagga.onDetected((response) => {
        console.log("바코드 스캔 결과", response.codeResult.code);
        handleResult(response.codeResult.code, resultSet);
      });
    } catch (error) {
      console.log("Scanner Error", error);
    }
  };

  // 사용 가능한 카메라 목록 가져오기
  const setAllCamera = () => {
    console.log("사용 가능한 카메라 목록 가져오기");
    Quagga.CameraAccess.enumerateVideoDevices().then((response) => {
      if (response?.length) {
        setCameras(response.map((device) => device.deviceId));
      }
    });
    console.log("사용 가능한 카메라 목록 가져오기 완료", cameras);
  };

  // 현재 활성화된 카메라를 설정하고, 라이트를 지원하는지 확인
  const handleSetCameraLight = () => {
    console.log("현재 활성화된 카메라를 설정하고, 라이트를 지원하는지 확인");
    // 현재 활성화된 비디오 트랙
    const currentTrack = Quagga.CameraAccess.getActiveTrack();
    console.log("현재 활성화된 비디오 트랙", currentTrack);
    const capabilities =
      typeof currentTrack.getCapabilities === "function"
        ? (currentTrack.getCapabilities() as MediaTrackCapabilities & {
            torch?: boolean;
          }) // 해당 트랙의 능력 가져옴
        : currentTrack.getConstraints(); // 해당 트랙의 제약 조건을 가져옴

    console.log("현재 활성화된 비디오 트랙의 능력", capabilities);
    // 라이트 지원 여부 확인
    if (capabilities && "torch" in capabilities && capabilities.torch) {
      setHasLight(true);
    }

    // 활성 비디오 트랙 설정
    setActiveVideoTrack(currentTrack);
    console.log("활성 비디오 트랙 설정 완료", activeVideoTrack);
  };

  const handleResult = (result, resultSet) => {
    // 15는 처리하기 위해 필요한 최소 샘플 수 -> 우리는 이거 몇으로 설정해야하냐
    if (resultSet.length >= 2) {
      console.log("바코드 스캔 결과 if", resultSet);
      processResultSet(resultSet);
    } else {
      console.log("바코드 스캔 결과 else", resultSet);
      resultSet.push(result);
    }
  };

  // 가장 빈번하게 나온 isbn을 찾는 함수
  const getFrequencyIsbn = (arr: string[]) => {
    const frequencyMap: { [key: string]: number } = {};
    let maxCount = 0;
    let mostFrequent: string | null = null;

    arr.forEach((item) => {
      frequencyMap[item] = (frequencyMap[item] || 0) + 1;
      if (frequencyMap[item] > maxCount) {
        maxCount = frequencyMap[item];
        mostFrequent = item;
      }
    });

    return mostFrequent;
  };

  // 스캔된 결과 세트가 isbn 정규 표현식과 일치하는지 확인
  const processResultSet = (resultSet) => {
    const mostFrequentIsbn = getFrequencyIsbn(resultSet);
    if (mostFrequentIsbn.match(ISBN_REGEX)) {
      setResult(mostFrequentIsbn);
      stopScan(); // 스캔 중지(스캔 완료)
    }
    resultSet.length = 0;
  };

  // 스캔 프로세스 중지, 초기 상태로 되돌림
  const stopScan = () => {
    if (lightIsOn) {
      setIsOn(false);
    }
    setCameraId("");
    setCameras([]);
    setActiveVideoTrack(null);
    setIsScanning(false);
    Quagga.offDetected(() => handleResult);
    Quagga.stop();
  };

  // 카메라 라이트 제어
  const switchLight = () => {
    activeVideoTrack
      .applyConstraints({
        advanced: [{ torch: !lightIsOn }],
      })
      .then(() => toggle())
      .catch((error) => setHasLight(false));
  };

  // 카메라 변경
  const changeCamera = () => {
    stopScan();
    const currentIndex = cameras.indexOf(cameraId);
    let newIndex = 0;
    if (currentIndex !== cameras.length - 1) {
      newIndex = currentIndex + 1;
    }
    setCameraId(cameras[newIndex]);
  };

  useEffect(() => {
    const checkVideoElement = () => {
      console.log("checkVideoElement");
      const videoElement = document.querySelector(
        "#interactive"
      ) as HTMLVideoElement;
      if (videoElement) {
        scan();
      } else {
        console.log("아직 videoElement 렌더링 안됨");
        setTimeout(checkVideoElement, 500);
      }
    };

    checkVideoElement();

    return () => {
      if (isScanning) {
        stopScan();
      }
    };
  }, []);

  // useEffect(() => {
  //   scan();
  //   return () => {
  //     if (isScanning) {
  //       stopScan();
  //     }
  //   };
  // }, []);

  return {
    scan,
    stopScan,
    isScanning,
    lightIsOn,
    changeCamera,
    result,
    cameras,
    hasLight,
  };
};

useScan.propTypes = {};

export default useScan;
