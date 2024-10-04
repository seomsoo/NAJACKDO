import { FaBookOpenReader } from "react-icons/fa6";

const C105Recommend = () => {
  return (
    <div>
      <div className="flex flex-row items-center text-xl">
        <FaBookOpenReader className="mr-2 text-main" />
        <span className="font-bold ">C105가 추천하는 오늘의 도서!</span>
      </div>
      <div
        className="flex overflow-x-auto whitespace-nowrap"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {Array(10)
          .fill(null)
          .map((_, index) => {
            return (
              <img
                src="harrypotter.png"
                alt=""
                width={150}
                className="mx-1 my-3"
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default C105Recommend;
