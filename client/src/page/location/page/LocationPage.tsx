import { useNavigate } from "react-router-dom";
import BookcaseContainer from "page/library/components/BookcaseContainer";
import { IoSettingsOutline } from "react-icons/io5";


const LocationPage = () => {
  const navigate = useNavigate();
  const goToLocationSetting = () => {
    navigate('/location/setting');
  };
  const user = {
    location: "수완동"
  }
  const bookcaseArray = [
    {
      name: "김도영",
      imageArray: ["https://placehold.co/71x104", "https://placehold.co/71x104", "https://placehold.co/71x104", "https://placehold.co/71x104", "https://placehold.co/71x104", "https://placehold.co/71x104"],
    },
    {
      name: "이도영",
      imageArray: ["https://placehold.co/71x104", "https://placehold.co/71x104", "https://placehold.co/71x104"]
    },
    {
      name: "박도영",
      imageArray: ["https://placehold.co/71x104", "https://placehold.co/71x104", "https://placehold.co/71x104"]
    },
    {
      name: "정도영",
      imageArray: ["https://placehold.co/71x104", "https://placehold.co/71x104", "https://placehold.co/71x104"]
    },
  ]

  return (
    <div className="mx-[25px]">
      <div className="flex flex-row justify-between mt-2 mb-6">
      <div>
        <span className="text-[20px] font-semibold font-['Pretendard'] text-[#79AC78]">{user.location}</span>
        <span className="text-[20px] font-semibold font-['Pretendard']">&nbsp;주변 책장</span>
      </div>
      {/* <div className="flex flex-row justify-start">
        <p className="text-[20px] font-semibold font-['Pretendard'] text-[#79AC78]">{user.location}</p>
        <p className="text-[20px] font-semibold font-['Pretendard']">&nbsp;주변 책장</p>
      </div> */}
        <IoSettingsOutline size={20} color="black" onClick={goToLocationSetting}/>
      </div>
      <div className="border-b border-[#776B5D] mb-4"/>
      {bookcaseArray.map((item, index) => {
            return (
              <div className="mb-4 pb-4 border-b border-[#776B5D]">
                <BookcaseContainer key={index} name={item.name} imageArray={item.imageArray} />
              </div>
            )
      })}

    </div>
  );
};

export default LocationPage;
