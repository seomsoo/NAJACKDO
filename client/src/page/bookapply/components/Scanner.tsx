import Quagga, { QuaggaJSConfigObject } from "@ericblade/quagga2";
import { useEffect } from "react";

interface ScannerProps {
  onDetected: (result: number) => void;
  scan: boolean;
  setScan: (scan: boolean) => void;
}

const config: QuaggaJSConfigObject = {
  inputStream: {
    name: "Live",
    type: "LiveStream",
    constraints: {
      facingMode: "environment",
      width: { max: 1280 },
      height: { max: 720 },
      aspectRatio: {
        min: 1,
        max: 2,
      },
    },
  },
  locator: {
    patchSize: "medium",
    halfSample: false,
  },
  numOfWorkers: 2,
  frequency: 100, // 100ms마다 스캔 시도
  decoder: {
    readers: ["ean_reader"],
  },
  locate: true,
};

const Scanner = ({ onDetected, scan, setScan }: ScannerProps) => {
  useEffect(() => {
    Quagga.init(config, (error) => {
      Quagga.start();

      const canvas = document.querySelector(".drawingBuffer");
      if (canvas) {
        canvas.classList.add("hidden");
      }

      return () => {
        Quagga.stop();
      };
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = (result) => {
    onDetected(result.codeResult.code);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      Quagga.stop();
      setScan(false);
    }, 300000);

    return () => {
      Quagga.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      id="interactive"
      className="viewport w-full h-full"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <video
        style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: "90%",
          height: "90%",
          objectFit: "cover",
        }}
        autoPlay
        muted
        playsInline
      />
    </div>
  );
};

export default Scanner;
