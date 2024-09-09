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
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3
    }; 

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    if (navigator.geolocation) {
    
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
          
          var lat = position.coords.latitude; // 위도
          var lon = position.coords.longitude; // 경도
          
          var locPosition = new window.kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
          
          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition, message);
              
        });
      
  } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      
      var locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667),    
          message = 'geolocation을 사용할수 없어요..'
          
      displayMarker(locPosition, message);

  }

  function displayMarker(locPosition: any , message: string) {
    console.log(locPosition.Ma)
    console.log(locPosition.La)

    // 마커를 생성합니다
    var marker = new window.kakao.maps.Marker({  
        map: map, 
        position: locPosition
    }); 
    
    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new window.kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);
    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
    var polygonPath = [
      new window.kakao.maps.LatLng(locPosition.Ma - 0.001, locPosition.La + 0.001),
      new window.kakao.maps.LatLng(locPosition.Ma + 0.0005, locPosition.La + 0.0015),
      new window.kakao.maps.LatLng(locPosition.Ma + 0.001, locPosition.La + 0.001),
      new window.kakao.maps.LatLng(locPosition.Ma + 0.001, locPosition.La - 0.001),
      new window.kakao.maps.LatLng(locPosition.Ma - 0.001, locPosition.La - 0.001),
      new window.kakao.maps.LatLng(locPosition.Ma - 0.001, locPosition.La + 0.001),

    ];
  
    // 지도에 표시할 다각형을 생성합니다
    var polygon = new window.kakao.maps.Polygon({
        path:polygonPath, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 3, // 선의 두께입니다
        strokeColor: '#39DE2A', // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'longdash', // 선의 스타일입니다
        fillColor: '#A2FF99', // 채우기 색깔입니다
        fillOpacity: 0.7 // 채우기 불투명도 입니다
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