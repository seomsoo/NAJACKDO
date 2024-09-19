import { useEffect, useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { INearLocation } from "atoms/Location.type";
import { getNearLocation } from "api/locationApi";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "components/ui/dialog";
import { IPaging } from "atoms/Base.type";


declare global {
  interface Window {
    kakao: any;
  }
}
interface ILocation {
  latitude: number;
  longitude: number;
}

const fetchLocation = (): Promise<ILocation> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          resolve({ latitude: lat, longitude: lon });
        },
        (error) => reject(error)
      );
    } else {
      reject(new Error("Fail to load my location"));
    }
  });
};


const KakaoMap = () => {
  const [address, setAddress] = useState(""); // 행정동 정보를 저장할 상태

  const {
    data: location,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = useQuery<ILocation>({
    queryKey: ["location"],
    queryFn: fetchLocation,
  });

  if (location) {
    console.log("내위치", location);
  }

  
  const {
    data: nearLocationData,
    isLoading: isNearLocationLoading,
    isError: isNearLocationError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<IPaging<INearLocation[]>>({
    queryKey: ["nearLocations"],
    queryFn: ({ pageParam = 0 }) => getNearLocation(location.latitude, location.longitude, pageParam as number),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.last) {
        return pages.length;
      }
      return undefined;
    },
    enabled: !!location,
  });

  console.log("neaarLocationData",nearLocationData)  
  
  // const {
  //   data: nearLocationData,
  //   isLoading: isNearLocationLoading,
  //   isError: isNearLocationError,
  // } =useQuery<INearLocation[]>({
  //   queryKey: ["nearLocations"],
  //   queryFn: async () => location ? getNearLocation(location.latitude, location.longitude, 0) : [],
  //   enabled: !!location,
  // })
  // if (nearLocationData) {
  //   console.log("주변 동 정보", nearLocationData);
  // }
  

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    
    // const mapOption = {
    //   center: new window.kakao.maps.LatLng(location ? location.latitude:35.204095, location? location.longitude:126.807187 ),
    //   level: 6,
    // };

    // const map = new window.kakao.maps.Map(mapContainer, mapOption);
    // displayMarker(mapOption.center);

    // function displayMarker(center: any) {
    //   const marker = new window.kakao.maps.Marker({
    //     map: map,
    //     position: center,
    //   });
    //   marker.setMap(map);
    //   map.setCenter(center);
    // }
  

  }, [location]);

  const handleLocationSelect = (locationName: string) => {
    setAddress(locationName);
  };

  // 로딩 상태 처리
  if (isLocationLoading || isNearLocationLoading) {
    return <div>Loading...</div>;
  }

  // 에러 처리
  if (isLocationError || isNearLocationError) {
    return <div>Error loading location data.</div>;
  }

  return (
    <>
      <div id="map" className="w-full h-[500px]"></div>
      <p className="text-center mt-2">{address}</p>
      {/* <Dialog>
        <DialogTrigger asChild>
          <button className="mt-4 p-2 bg-blue-500 text-white rounded">
            근처 동 선택
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>근처 동 선택</DialogTitle>
          </DialogHeader>
          <ul>
            {nearLocationData.map((location, index) => (
              <li key={index}>
                <button
                  onClick={() => handleLocationSelect(location.locationName)}
                  className="w-full text-left p-2 border-b hover:bg-gray-100"
                >
                  {location.locationName}
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog> */}
    </>
  );
}

export default KakaoMap;
