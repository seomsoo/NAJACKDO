interface ReviewProps {
  count: number;
  comment: string;
}

const Review = ({ count, comment }: ReviewProps) => {
  return (
    <div className="mt-1 flex felx-row items-center">
      <p className="w-[20px] text-[12px] mr-2 text-center">{count}</p>
      <p className="text-[12px]">{comment}</p>
    </div>
  );
};

export default Review;
