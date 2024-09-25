import { useState } from "react";
import LocationSetting from "page/location/components/LocationSetting";
import RangeSetting from "page/location/components/RangeSetting";

const LocationSettingPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (locationName, latitude, longitude, locationCode) => {
    setSelectedLocation({ locationName, latitude, longitude, locationCode });
  };

  return (
    <div>
      {!selectedLocation ? (
        // LocationSetting 컴포넌트 렌더링
        <LocationSetting onLocationSelect={handleLocationSelect} />
      ) : (
        // RangeSetting 컴포넌트 렌더링
        <RangeSetting selectedLocation={selectedLocation} />
      )}
    </div>
  );
};

export default LocationSettingPage;
