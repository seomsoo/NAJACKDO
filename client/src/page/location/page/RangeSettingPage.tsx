import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ILocationRange } from "atoms/Location.type";
import { getLocationRange } from "api/locationApi";
import { IoIosArrowBack } from "react-icons/io";
import { Slider } from "components/ui/slider";

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
  const [mapLoaded, setMapLoaded] = useState(false);
  const [ range, setRange ] = useState(0);

  const {
    data: locationRange,
    isLoading,
    isError,
  } = useQuery<ILocationRange[]>({
    queryKey: ["locationRange"],
    queryFn: () => getLocationRange(latitude, longitude),
  });
  console.log("locationRange", locationRange);
  console.log("제발", locationRange?.[range]);

  useEffect(() => {
    if (!locationRange || !map) {
      console.log("불러오는 중");
      return;
    }
    console.log("불러옴");

    // 폴리곤을 그리기 위한 함수 호출
    displayPolygons(locationRange?.[range]);

    function displayPolygons(locationRanges:any) {
      locationRanges.forEach((location) => {
        console.log("으아악 포이치", location);
        const polygonCoordinates = parsePolygon(location.polygon);
        if (polygonCoordinates.length > 0) {
          const polygonPath = polygonCoordinates.map(
            (coord) => new window.kakao.maps.LatLng(coord[0], coord[1])
          );

          const polygon = new window.kakao.maps.Polygon({
            path: polygonPath,
            strokeWeight: 2.5,
            strokeColor: "#E8B900",
            strokeOpacity: 1,
            strokeStyle: "solid",
            fillColor: "#E8B900",
            fillOpacity: 0.4,
          });

          polygon.setMap(map);
        }
      });
    }

    function parsePolygon(polygon: string) {
      if (!polygon) return [];
      const polygonArray = polygon
        .replace("MULTIPOLYGON (((", "")
        .replace(")))", "")
        .split(", ")
        .map((latlng) => latlng.split(" ").map(Number));

      console.log("polygonArray", polygonArray);
      return polygonArray;
    }
  }, [locationRange, map]);

  useEffect(() => {
    const mapContainer = document.getElementById("kakaomap");
    if (!mapContainer) {
      setTimeout(() => setMapLoaded(mapLoaded => !mapLoaded), 1000);
      return;
    }
    const mapOption = {
      center: new window.kakao.maps.LatLng(longitude, latitude),
      level: 7,
    };
    const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(mapInstance);
  }, [latitude, longitude, mapLoaded, range]);

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
      {/* <div className="flex flex-row mx-6 my-4 items-center justify-center">
        <p className="mr-2">가까운 책장</p>
        <input
          type="range"
          min="0"
          max={locationRange?.length - 1} //3
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="w-[230px] bg-[#E8B900]"
        />
        <span className="ml-2">먼 책장</span>
      </div> */}
        <div className="mx-6 my-4">
        <Slider
          min={0}
          max={locationRange?.length - 1 || 0}
          step={1}
          value={[range]}
          onValueChange={(value) => setRange(value?.[0])}
          className="w-full"
        />
        <p>현재 범위: {range}</p>
      </div>
    </div>
  );
};

export default RangeSettingPage;