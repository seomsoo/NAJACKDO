import LocationSetting from "page/location/components/LocationSetting";
import RangeSetting from "page/location/components/RangeSetting";
import { useState } from "react";

const LocationSettingPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (
    locationName,
    latitude,
    longitude,
    locationCode
  ) => {
    setSelectedLocation({ locationName, latitude, longitude, locationCode });
  };

  return (
    <div>
      {!selectedLocation ? (
        <LocationSetting onLocationSelect={handleLocationSelect} />
      ) : (
        <RangeSetting selectedLocation={selectedLocation} />
      )}
    </div>
  );
};

export default LocationSettingPage;
