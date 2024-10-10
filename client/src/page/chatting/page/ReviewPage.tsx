import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";
import CheckboxGroup from "../components/CheckboxGroup";
import EmojiSelector from "../components/EmojiSelector";

const ReviewPage = () => {
  const { rentalId, ownerName, customerName, bookTitle, bookImageUrl, bookCount } =
    useLocation().state;
  const { nickname } = useUserStore();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const isOwner = nickname === ownerName;

  const initialState = {
    clean: false,
    punctual: false,
    polite: false,
    responsive: false,
  };

  const [checkedItems, setCheckedItems] = useState(initialState);

  const [selectedEmoji, setSelectedEmoji] = useState<"like" | "dislike" | null>(null);

  const checkboxOptions: {
    like: {
      id: "clean" | "punctual" | "polite" | "responsive";
      label: string;
    }[];
    dislike: {
      id: "clean" | "punctual" | "polite" | "responsive";
      label: string;
    }[];
  } = {
    like: [
      { id: "clean", label: "책이 매우 깨끗해요." }, // 1
      { id: "punctual", label: "시간 약속을 잘 지켜요." }, // 2
      { id: "polite", label: "친절하고 매너가 좋아요." }, // 3
      { id: "responsive", label: "응답이 빨라요." }, // 4
    ],
    dislike: [
      { id: "clean", label: "책 상태가 사진과 달라요." }, // 5
      { id: "punctual", label: "시간 약속을 안 지켜요." }, // 6
      { id: "polite", label: "약속 장소에 나타나지 않았어요." }, // 7
      { id: "responsive", label: "책을 분실 혹은 훼손 했어요." }, // 8
    ],
  };

  const handleCheckboxChange = (item: "clean" | "punctual" | "polite" | "responsive") => {
    setCheckedItems((prevItems) => ({
      ...prevItems,
      [item]: !prevItems[item],
    }));
  };

  // 이모지 선택 시 상태 초기화 및 업데이트
  const handleEmojiSelect = (emoji: "like" | "dislike") => {
    setSelectedEmoji(emoji);
    setCheckedItems(initialState); // 체크박스 상태 초기화
  };

  // 현재 선택된 이모지에 따라 체크된 항목이 있는지 확인
  const isAnyChecked = Object.values(checkedItems).some(Boolean);

  return (
    <div className="pb-10">
      <header className="p-6 text-2xl font-semibold flex items-center">
        <button onClick={goBack}>
          <IoIosArrowBack />
        </button>
        <span className="ml-20">거래 후기 보내기</span>
      </header>

      <section className="pb-4 border-b">
        <div className="flex ml-7 items-center">
          <img src={bookImageUrl} alt={bookTitle} className="object-cover rounded-xl w-16 h-16" />
          <div className="flex flex-col gap-2 ml-4 font-medium">
            <p className="text-gray-500 space-x-1">
              <span className="text-black">{bookTitle}</span>
              <span className="text-sm">{bookCount > 0 && `외 ${bookCount - 1}권`}</span>
            </p>
            <span className="text-xs">
              <span className="text-gray-500">거래한 이웃 </span>
              {isOwner ? customerName : ownerName}
            </span>
          </div>
        </div>
      </section>
      <main className="px-6">
        <div className="flex flex-col gap-2 py-8 text-2xl font-semibold">
          <span>
            <span className="text-main">{nickname}</span>님,
          </span>
          <span className="text-base">
            {isOwner ? customerName : ownerName}님과 거래 어떠셨나요?
          </span>
        </div>

        <EmojiSelector selectedEmoji={selectedEmoji} onEmojiSelect={handleEmojiSelect} />

        {selectedEmoji && (
          <CheckboxGroup
            selectedEmoji={selectedEmoji}
            checkedItems={checkedItems}
            checkboxOptions={checkboxOptions[selectedEmoji]}
            onCheckboxChange={handleCheckboxChange}
            isAnyChecked={isAnyChecked}
            rentalId={rentalId}
          />
        )}
      </main>
    </div>
  );
};

export default ReviewPage;
