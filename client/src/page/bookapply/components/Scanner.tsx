import Quagga from "@ericblade/quagga2";
import { useEffect } from "react";

interface ScannerProps {
  onDetected: (result: number) => void
  scan: boolean;
  setScan: (scan: boolean) => void;
}

const config = {
  inputStream: {
    name: "Live",
    type: "LiveStream",
    constraints: {
      facingMode: "environment",
      focusMode: "continuous",
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
  locate: false, // 바코드를 자동으로 찾을 지 여부 -> 우리는 네모칸 안으로 들어와야 스캔
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
    }, 5000);

    return () => {
      Quagga.stop();
      clearTimeout(timer);
    }
  }, []);

  return <div id="interactive" className="viewport w-4/5 h-4/5 mt-10" />;
};

export default Scanner;
