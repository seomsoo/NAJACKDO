import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ILocationRange } from "atoms/Location.type";
import { getLocationRange } from "api/locationApi";
import { IoIosArrowBack } from "react-icons/io";

declare global {
  interface Window {
    kakao: any;
  }
}

const RangeSettingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { latitude, longitude, locationName } = location.state || {};
  const [map, setMap] = useState<any>(null);

  const {
    data: locationRange,
    isLoading,
    isError,
  } = useQuery<ILocationRange[]>({
    queryKey: ["locationRange"],
    queryFn: () => getLocationRange(latitude, longitude),
  });

  useEffect(() => {
    if (!locationRange || !map) {
      console.log("불러오는 중");
      return;
    }
    console.log("불러옴");

    // 폴리곤을 그리기 위한 함수 호출
    displayPolygons(locationRange);

    function displayPolygons(locationRanges: ILocationRange[]) {
      locationRanges.forEach((location) => {
        const polygonCoordinates = parseMultipolygon(location.polygon);
        if (polygonCoordinates.length > 0) {
          const polygonPath = polygonCoordinates.map(
            (coord) => new window.kakao.maps.LatLng(coord[0], coord[1])
          );

          const polygon = new window.kakao.maps.Polygon({
            path: polygonPath,
            strokeWeight: 2,
            strokeColor: "#B0A695",
            strokeOpacity: 1,
            strokeStyle: "solid",
            fillColor: "#B0A695",
            fillOpacity: 0.2,
          });

          polygon.setMap(map);
        }
      });
    }

    function parseMultipolygon(multipolygon: string) {
      if (!multipolygon) return [];
      const polygonArray = multipolygon
        .replace("MULTIPOLYGON(((", "")
        .replace(")))", "")
        .split(", ")
        .map((latlng) => latlng.split(" ").map(Number));
      return polygonArray;
    }
  }, [locationRange, map]);

  useEffect(() => {
    const mapContainer = document.getElementById("kakaomap");
    if (!mapContainer) return;

    const mapOption = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 6,
    };
    const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(mapInstance);
  }, [latitude, longitude]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading location data.</div>;
  }

  return (
    <div>
      <div className="flex flex-row mx-6 py-4">
        <button onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </button>
        <p className="text-2xl font-bold ml-2">범위 설정</p>
        <p className="ml-2">{locationName}</p>
      </div>
      <div id="kakaomap" className="w-full h-[500px]"></div>
    </div>
  );
};

export default RangeSettingPage;