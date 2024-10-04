const Loading = () => {
  return (
    <div className="flex flex-col pt-60 items-center ">
      <img src="loading.gif" className="w-32 h-24" alt="Loading.." />
      <span className="hakgyo text-4xl mt-5 text-[#2b6124]">
        책장을 넘기고 있어요!
      </span>
    </div>
  );
};

export default Loading;
