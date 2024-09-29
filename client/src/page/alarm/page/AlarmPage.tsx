import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Alarm from 'page/alarm/components/Alarm';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {getAlarm} from 'api/alarmApi';
import { useCallback, useEffect, useRef } from 'react';
import { getAlarmReadSucess } from 'api/alarmApi';


const AlarmPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: alarmData,
    isLoading: isAlarmLoading,
    isError: isAlarmError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["alarms"],
    queryFn: ({ pageParam = 0 }) => getAlarm(pageParam as number),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.last) {
        return pages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
  });
  
  

  const alarmArray = alarmData?.pages?.flatMap((page) => page.content) || [];

  // 알람 리스트 읽기 성공
  const {
    data: success,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ['success'],
    queryFn: getAlarmReadSucess,
    enabled: alarmArray.length > 0 && !isAlarmError,
  });
  console.log("AlarmReadSucess", alarmArray.length > 0 && !isAlarmError);
  console.log("length", alarmArray.length);
  console.log("isAlarmError", isAlarmError);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

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

  if (isAlarmLoading) {
    return <div>Loading...</div>;
  }

  if (isAlarmError) {
    return <div>Error loading location data.</div>;
  }

  return (
    <div>
      <div className='flex flex-row mx-6 gap-1 py-4 '>
        <button onClick={goBack}>
          <IoIosArrowBack className='text-xl' />
        </button>
        <p className='text-2xl font-bold '>알림</p>
      </div>

      {alarmArray.map((item, index) => {
        return (
          <Alarm
            key={index}
            userId={item.userId}
            content={item.content}
            title={item.title}
            createAt={item.createAt}
            updateAt={item.updateAt}
            type={item.type}
          />
        );
      })}
            <div ref={loadMoreRef} className="loading">
        {isFetchingNextPage ? "Loading more..." : ""}
      </div>
    </div>
  );
};

export default AlarmPage;
