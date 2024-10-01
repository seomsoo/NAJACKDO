import { useMutation } from '@tanstack/react-query';
import { postTimeSpent } from 'api/bookApi';
import { useEffect, useState } from 'react';

function useTimeSpent(bookId: number, genre: string) {
  console.log("일단 훅에 들어오긴함")

  useEffect(() => {
    const startTime = new Date();

    return () => {
      const endTime = new Date()
      const timeSpent = endTime.getTime() - startTime.getTime();
      console.log("timeSpent", timeSpent);
    }
  })

  const mutation = useMutation({
    mutationKey: ["timeSpentData"],
    mutationFn: postTimeSpent,

    onSuccess: () => {
      console.log("체류 시간 저장 성공");
    },

    onError: (error) => {
      console.log("체류 시간 저장 error", error);
    },
  });

  // useEffect(() => {
  //   if (elapsedTime > 0) {
  //     mutation.mutate({
  //       bookId: bookId,
  //       genre: genre,
  //       timeSpent: elapsedTime,
  //     });
  //   }
  // }, [elapsedTime]);
};

export default useTimeSpent;
