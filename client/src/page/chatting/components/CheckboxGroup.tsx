import { useMutation } from "@tanstack/react-query";
import { postReview } from "api/rentalApi";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type CheckboxGroupProps = {
  selectedEmoji: "like" | "dislike";
  checkedItems: {
    [key in "clean" | "punctual" | "polite" | "responsive"]: boolean;
  };
  checkboxOptions: {
    id: "clean" | "punctual" | "polite" | "responsive";
    label: string;
  }[];
  onCheckboxChange: (
    item: "clean" | "punctual" | "polite" | "responsive"
  ) => void;
  isAnyChecked: boolean;
  rentalId: number;
};

function CheckboxGroup({
  selectedEmoji,
  checkedItems,
  checkboxOptions,
  onCheckboxChange,
  isAnyChecked,
  rentalId,
}: CheckboxGroupProps) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["review"],
    mutationFn: postReview,
    onSuccess: () => {
      navigate(-1);
    },
  });

  const handelPostReview = () => {
    const submitList = new Array();
    const key = selectedEmoji === "like" ? 1 : 5;

    Object.values(checkedItems).map((item, index) => {
      if (item) {
        submitList.push(index + key);
      }
    });

    mutation.mutate({
      rentalId: rentalId, // 카트아이디
      reviewItemIds: submitList,
    });
  };

  return (
    <div className="gap-2 flex flex-col">
      <div className="font-semibold text-lg pt-7 pb-4">
        <span>
          {selectedEmoji === "like"
            ? "어떤 점이 좋았나요?"
            : "어떤 점이 별로였나요?"}
        </span>
      </div>

      {checkboxOptions.map((option) => (
        <div
          key={option.id}
          className="flex items-center gap-2"
          onClick={() => onCheckboxChange(option.id)}
        >
          <label
            htmlFor={option.id}
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
              checkedItems[option.id]
                ? "border-main bg-main"
                : "border-gray-400"
            }`}
          >
            {checkedItems[option.id] && (
              <FaCheck className="text-white w-4 h-4" />
            )}
          </label>
          <span className="text-sm font-medium">{option.label}</span>
        </div>
      ))}

      <button
        className={`font-bold bg-sub7 text-white w-full text-lg mt-8 py-3 rounded-lg mb-5 ${
          isAnyChecked ? "opacity-100" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isAnyChecked}
        onClick={handelPostReview}
      >
        후기 보내기
      </button>
    </div>
  );
}

export default CheckboxGroup;
