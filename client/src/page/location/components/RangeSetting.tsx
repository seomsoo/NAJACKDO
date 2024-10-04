import { useMutation, useQuery } from "@tanstack/react-query";
import { getLocationRange, postMyLocation } from "api/locationApi";
import { ILocationRange } from "atoms/Location.type";
import { RangeSlider } from "components/ui/rangeslider";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}
const RangeSetting = ({ selectedLocation }) => {
  const { latitude, longitude, locationName, locationCode } =
    selectedLocation || {};
  const location = useLocation();
  const navigate = useNavigate();
  const [map, setMap] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [range, setRange] = useState(0);

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

    function displayPolygons(locationRanges: any) {
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
      setTimeout(() => setMapLoaded((mapLoaded) => !mapLoaded), 1000);
      return;
    }
    const mapOption = {
      center: new window.kakao.maps.LatLng(longitude, latitude),
      level: 7,
    };
    const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(mapInstance);
  }, [latitude, longitude, mapLoaded, range]);

  const mutation = useMutation({
    mutationKey: ["location"],
    mutationFn: postMyLocation,

    onSuccess: () => {
      alert("오예 성공");
      navigate("/");
    },
  });

  const handleLocationClick = () => {
    mutation.mutate({
      locationCode: locationCode,
      distanceMeters: range * 0.005 + 0.02,
    });
    console.log(
      "locationCode",
      locationCode,
      "distanceMeters",
      range * 0.005 + 0.02
    );
  };

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
          <IoIosArrowBack className="text-2xl" />
        </button>
        <p className="text-2xl font-bold ml-2">범위 설정</p>
      </div>
      <div id="kakaomap" className="w-full h-[550px] "></div>
      <div className="mx-6 my-10 font-semibold flex flex-row justify-center items-center">
        <p>가까운</p>
        <RangeSlider
          min={0}
          max={locationRange?.length - 1 || 0} //3
          step={1}
          value={[range]}
          onValueChange={(value) => setRange(value[0])}
          className="w-[240px]"
        />
        <p>먼</p>
      </div>
      <div className="flex justify-center mt-2">
        <button
          className=" bg-sub7 text-white rounded-xl px-24 py-3"
          onClick={handleLocationClick}
        >
          <span className="font-bold">
            {locationName.split(" ").slice(-1)[0]}
          </span>
          으로 지역 설정
        </button>
      </div>
    </div>
  );
};

export default RangeSetting;
