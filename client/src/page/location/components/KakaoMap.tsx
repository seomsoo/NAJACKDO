import { useEffect, useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
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
  const [address, setAddress] = useState(""); // 행정동 정보
  const [isOpen, setIsOpen] = useState(true);
  const [map, setMap] = useState<any>(null); // 지도 상태 추가
  const [isMapLoaded, setIsMapLoaded] = useState(false); // 지도 로드 상태 확인
  const [latlng, setLatlng] = useState("");

  const {
    data: location,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = useQuery<ILocation>({
    queryKey: ["location"],
    queryFn: fetchLocation,
  });

  const {
    data: nearLocationData,
    isLoading: isNearLocationLoading,
    isError: isNearLocationError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IPaging<INearLocation[]>>({
    queryKey: ["nearLocations"],
    queryFn: ({ pageParam = 0 }) => getNearLocation(location?.latitude || 0, location?.longitude || 0, pageParam as number),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.last) {
        return pages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!location, // location이 있을 때만 쿼리 실행
  });

  const nearLocationArray = nearLocationData?.pages?.flatMap((page) => page.content) || [];

  useEffect(() => {
    // 카카오맵 API가 로드되었는지 확인


    if (!location) {
      console.log('현재 위치 조회에 실패');
      return;
    }

    const mapContainer = document.getElementById('map');
    
    // mapContainer가 제대로 로드되었는지 확인
    if (!mapContainer) {
      console.log('Map container is not ready');
      return;
    }

    const mapOption = { 
      center: new window.kakao.maps.LatLng(location.latitude, location.longitude), // 지도의 중심좌표
      level: 6,
    };

    const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(mapInstance); // 생성된 지도를 상태에 저장
    setIsMapLoaded(true); // 지도가 로드되었음을 표시

    // 초기 위치에 마커 표시
    displayMarker(mapInstance, mapOption.center);
  }, [location, address]);

  // 특정 위치에 마커 표시 함수
  const displayMarker = (map: any, position: any) => {
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: position,
    });
    marker.setMap(map); // 지도에 마커 표시
    map.setCenter(position); // 지도 중심을 마커 위치로 설정
  };

  const handleLocationSelect = (locationName: string, latitude: number, longitude: number) => {
    setAddress(locationName);
    const mapCenter = new window.kakao.maps.LatLng(latitude, longitude);
    
    
    
    setIsOpen(false);
  };

  if (isLocationLoading || isNearLocationLoading) {
    return <div>Loading...</div>;
  }

  if (isLocationError || isNearLocationError) {
    return <div>Error loading location data.</div>;
  }

  return (
    <>
      <div id="map" className="w-full h-[500px]"></div>
      <p className="text-center mt-2">{address}</p>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            {nearLocationArray.map((location, index) => (
              <li key={index}>
                <button
                  onClick={() => handleLocationSelect(location.locationName, location.latitude, location.longitude)}
                  className="w-full text-left p-2 border-b hover:bg-gray-100"
                >
                  {location.locationName}
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KakaoMap;

// import { useEffect, useState } from "react";

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// const KakaoMap = () => {
//   const [address, setAddress] = useState(""); // 행정동 정보를 저장할 상태

  

//   useEffect(() => {
//     const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//     mapOption = { 
//         center: new window.kakao.maps.LatLng(35.204095, 126.807187), // 지도의 중심좌표
//         level: 6
//     }; 

//     const map = new window.kakao.maps.Map(mapContainer, mapOption);

//     if (navigator.geolocation) {
//       // 현위치
//       navigator.geolocation.getCurrentPosition(function(position) {
        
//         var lat = position.coords.latitude;
//         var lon = position.coords.longitude;
        
//         var locPosition = new window.kakao.maps.LatLng(lat, lon);

//         displayMarker(locPosition);
//       });
        
//     } else { 
//       var locPosition = new window.kakao.maps.LatLng(35.204095, 126.8071876)   
//       console.log('현재 위치 조회에 실패');
//       displayMarker(locPosition);
//     }

//     function displayMarker(locPosition: any) {
//       var marker = new window.kakao.maps.Marker({  
//         map: map, 
//         position: locPosition
//       }); 
//       marker.setMap(map);
//       map.setCenter(locPosition);
//     }
    
    
//   }, []);

//   return (
//     <>
//       <div id="map" className="w-full h-[500px]"></div>
//       <p className="text-center mt-2">{address}</p>
//     </>
//   );
// }

// export default KakaoMap;
