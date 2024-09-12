import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const [address, setAddress] = useState(""); // 행정동 정보를 저장할 상태

  const polygonArray = [
    {
      locationName: "광주 광산구 하남동",
      locationPolygon: [35.2211604737, 126.8103687071,
        35.2025753369, 126.8186611635,
        35.1802463214, 126.8087259725,
        35.1635846867, 126.7920117674,
        35.2153028754, 126.7786200907,
        35.2211604737, 126.8103687071]
    },
    {
      locationName: "광주 광산구 수완동",
      locationPolygon: [35.2025753369, 126.8186611635,
        35.1977068327, 126.8343350472,
        35.1860890847, 126.8306159230,
        35.1802463214, 126.8087259725,
        35.2025753369, 126.8186611635]
       
    },
    {
      locationName: "광주 광산구 비아동",
      locationPolygon: [35.2211604737, 126.8103687071, 
        35.2317120787, 126.8257548636,
        35.2015392391, 126.8387450811, 
        35.1977068327, 126.8343350472,
        35.2025753369, 126.8186611635,
        35.2211604737, 126.8103687071]
       
    }
  ]

  useEffect(() => {
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new window.kakao.maps.LatLng(35.204095, 126.807187), // 지도의 중심좌표
        level: 6
    }; 

    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const geocoder = new window.kakao.maps.services.Geocoder(); // 주소 변환을 위한 geocoder

    if (navigator.geolocation) {
      // 현위치
      navigator.geolocation.getCurrentPosition(function(position) {
        
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        
        var locPosition = new window.kakao.maps.LatLng(lat, lon);

        searchAddrFromCoords(lon, lat, function(result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            for (let i = 0; i < result.length; i++) {
              if (result[i].region_type === 'H') { 
                setAddress(result[i].address_name); 
                break;
              }
            }
          }
        });

        displayMarker(locPosition);
      });
        
    } else { 
      var locPosition = new window.kakao.maps.LatLng(35.204095, 126.8071876)   
      console.log('현재 위치 조회에 실패');
      displayMarker(locPosition);
    }

    function displayMarker(locPosition: any) {
      var marker = new window.kakao.maps.Marker({  
        map: map, 
        position: locPosition
      }); 
      marker.setMap(map);
      map.setCenter(locPosition);
    }

    // polygon - 값 받아서 바꾸기
    displayPolygon(polygonArray);
    
    function displayPolygon(polygonArray: { locationName: string; locationPolygon: number[] }[]) {
      var polygonPath: any[] = [];

      polygonArray.forEach(polygon => {
        for (let i = 0; i < polygon.locationPolygon.length; i += 2) {
          polygonPath.push(new window.kakao.maps.LatLng(polygon.locationPolygon[i], polygon.locationPolygon[i+1]))
        }
      });

      var polygon = new window.kakao.maps.Polygon({
        path:polygonPath,
        strokeWeight: 2,
        strokeColor: '#B0A695',
        strokeOpacity: 1,
        strokeStyle: 'solid',
        fillColor: '#B0A695',
        fillOpacity: 0.2
      });
    
      polygon.setMap(map);
    }

    // 좌표 -> 주소
    function searchAddrFromCoords(lng: number, lat: number, callback: Function) {
      geocoder.coord2RegionCode(lng, lat, callback);
    }

  }, []);

  return (
    <>
      <div id="map" className="w-full h-[500px]"></div>
      <p className="text-center mt-2">{address}</p>
    </>
  );
}

export default KakaoMap;
