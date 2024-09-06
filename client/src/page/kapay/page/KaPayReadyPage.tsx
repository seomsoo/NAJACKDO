import React, { useEffect, useRef } from "react";

interface KaPayReadyPageProps {
  redirectUrl: string;
}

const KaPayReadyPage: React.FC<KaPayReadyPageProps> = ({ redirectUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const kakaopay = {
    ref: null as HTMLDivElement | null,
    showTms: function (url: string) {
      this.ref = iframeLayer.open(url);
    },
    cancel: function () {
      iframeLayer.close();
    },
    close: function () {
      iframeLayer.close();
    },
  };

  const iframeLayer = {
    open: function (url: string) {
      if (containerRef.current) {
        containerRef.current.appendChild(this.elBackgroundPanel());
        this.createIframe(url);
        if (iframeRef.current) {
          containerRef.current.appendChild(iframeRef.current);
        }
        document.body.insertBefore(containerRef.current, document.body.firstChild);
      }
      return containerRef.current;
    },
    close: function () {
      if (containerRef.current && iframeRef.current) {
        document.body.removeChild(containerRef.current);
        containerRef.current.removeChild(iframeRef.current);
      }
    },
    createIframe: function (url: string) {
      if (iframeRef.current) {
        const defaultStyle = {
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          border: "0",
          backgroundColor: "#fff",
          margin: "-255px 0 0 -213px",
        };
        iframeRef.current.width = "426px";
        iframeRef.current.height = "510px";
        iframeRef.current.style.zIndex = "9999";
        iframeRef.current.src = url;
        Object.assign(iframeRef.current.style, defaultStyle);
      }
    },
    elBackgroundPanel: function () {
      const el = document.createElement("div");
      const defaultStyle = {
        width: "100%",
        height: "100%",
        position: "fixed" as const,
        top: 0,
        left: 0,
        backgroundColor: "#000",
        opacity: 0.6,
      };
      Object.assign(el.style, defaultStyle);
      return el;
    },
  };

  useEffect(() => {
    kakaopay.showTms(redirectUrl);
    return () => kakaopay.close(); // Clean up on unmount
  }, [redirectUrl]);

  return (
    <div>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", position: "fixed", top: 0, left: 0, zIndex: 9999 }}
      >
        <iframe ref={iframeRef} />
      </div>
    </div>
  );
};

export default KaPayReadyPage;
