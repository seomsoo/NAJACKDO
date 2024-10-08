const Error = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col pt-52 items-center ">
      <img src="/errorbook.png" className="w-32 h-24" alt="error.." />
      <span className="hakgyo text-4xl mt-5 ">화면을 불러오지 못 했어요.</span>
      <button
        onClick={handleReload}
        className="mt-10 px-6 py-2 bg-sub7 text-white rounded-xl"
      >
        다시 시도하기
      </button>
    </div>
  );
};

export default Error;
