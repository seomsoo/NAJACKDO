import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new window.kakao.maps.LatLng(35.204095, 126.807187), // 지도의 중심좌표
        level: 6
    }; 

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    if (navigator.geolocation) {
    
      // 현위치
      navigator.geolocation.getCurrentPosition(function(position) {
          
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          
          var locPosition = new window.kakao.maps.LatLng(lat, lon),
              message = '<div style="padding:5px;">현 위치</div>'; // infowindow
          
          displayMarker(locPosition, message);
              
        });
      
  } else { 
      
      var locPosition = new window.kakao.maps.LatLng(35.204095, 126.8071876),    
          message = '현재 위치 조회에 실패했습니다.'
          
      displayMarker(locPosition, message);

  }

  function displayMarker(locPosition: any , message: string) {
    console.log(locPosition.Ma)
    console.log(locPosition.La)

    var marker = new window.kakao.maps.Marker({  
        map: map, 
        position: locPosition
    }); 
    
    var iwContent = message,
        iwRemoveable = true;


    var infowindow = new window.kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    infowindow.open(map, marker);
    
    map.setCenter(locPosition);

    // polygon - 행정동 값 받아서 바꾸기
    var polygonPath = [
      new window.kakao.maps.LatLng(locPosition.Ma - 0.01, locPosition.La + 0.01),
      new window.kakao.maps.LatLng(locPosition.Ma + 0.005, locPosition.La + 0.015),
      new window.kakao.maps.LatLng(locPosition.Ma + 0.01, locPosition.La + 0.01),
      new window.kakao.maps.LatLng(locPosition.Ma + 0.01, locPosition.La - 0.01),
      new window.kakao.maps.LatLng(locPosition.Ma - 0.01, locPosition.La - 0.01),
      new window.kakao.maps.LatLng(locPosition.Ma - 0.01, locPosition.La + 0.01),

    ];
  
    var polygon = new window.kakao.maps.Polygon({
        path:polygonPath, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 2, // 선의 두께
        strokeColor: '#B0A695', // 선의 색깔
        strokeOpacity: 1, // 선의 불투명도
        strokeStyle: 'solid', // 선의 스타일
        fillColor: '#B0A695', // 채우기
        fillOpacity: 0.2 // 채우기 불투명도
    });
    
    // 지도에 다각형을 표시합니다
    polygon.setMap(map);      
}   
  }, []);

  
  return (
      <div id="map" className="w-full h-[500px]"></div>
    )
}

export default KakaoMap