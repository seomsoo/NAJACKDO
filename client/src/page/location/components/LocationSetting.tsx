import { useEffect, useState, useRef, useCallback } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { IPaging } from "atoms/Base.type";
import { INearLocation } from "atoms/Location.type";
import { getNearLocation } from "api/locationApi";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';

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

interface LocationSettingProps {
  nextUrl: string;
}
const LocationSetting = ({
  nextUrl,
}: LocationSettingProps) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [map, setMap] = useState<any>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);


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
    enabled: !!location,
  });

  const nearLocationArray = nearLocationData?.pages?.flatMap((page) => page.content) || [];

  const handleLocationSelect = (locationName: string, latitude: number, longitude: number, locationCode:number) => {
    setAddress(locationName);
    console.log(`선택한 위치: ${locationName} (${latitude}, ${longitude})`);
    navigate(`${nextUrl}`, { state: { latitude, longitude, locationName, locationCode } });
  };


  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const option = {
      root: null, // viewport as root
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);


  if (isLocationLoading || isNearLocationLoading) {
    return <div>Loading...</div>;
  }

  if (isLocationError || isNearLocationError) {
    return <div>Error loading location data.</div>;
  }

  return (
    <div>
      <div className="flex flex-row mx-6 py-4">
        <button onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </button>
        <p className="text-2xl font-bold ml-2">지역 설정</p>
      </div>
      <ul>
        {nearLocationArray.map((location, index) => (
          <li key={index}>
            <button
              onClick={() => handleLocationSelect(location.locationName, location.latitude, location.longitude, location.locationCode)}
              className="w-full text-left p-2 border-b hover:bg-gray-100"
            >
              {location.locationName}
            </button>
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="loading">
        {isFetchingNextPage ? "Loading more..." : ""}
      </div>
    </div>
  );
};

export default LocationSetting;
