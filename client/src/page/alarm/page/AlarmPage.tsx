import { useInfiniteQuery } from "@tanstack/react-query";
import { getAlarm, postAlarmReadSucess } from "api/alarmApi";
import ClipLoading from "components/common/ClipLoading";
import Error from "components/common/Error";
import Loading from "components/common/Loading";
import Alarm from "page/alarm/components/Alarm";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    return () => {
      postAlarmReadSucess();
    };
  }, []);

  if (isAlarmLoading) {
    return <Loading />;
  }

  if (isAlarmError) {
    return <Error />;
  }

  return (
    <div>
      {alarmArray.map((item, index) => {
        return (
          <Alarm
            key={index}
            content={item.content}
            title={item.title}
            createAt={item.createAt}
            type={item.type}
          />
        );
      })}
      <div ref={loadMoreRef} className="loading">
        {isFetchingNextPage ? <ClipLoading /> : ""}
      </div>
    </div>
  );
};

export default AlarmPage;
