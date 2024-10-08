import { PiSmileySadThin, PiSmileyThin } from "react-icons/pi";

type EmojiSelectorProps = {
  selectedEmoji: "like" | "dislike" | null;
  onEmojiSelect: (emoji: "like" | "dislike") => void;
};

function EmojiSelector({ selectedEmoji, onEmojiSelect }: EmojiSelectorProps) {
  return (
    <div className="flex items-center justify-between px-5">
      <div className="flex flex-col items-center">
        <button
          className={`text-9xl ${
            selectedEmoji === "like" ? "text-sub8" : "text-[#989898]"
          }`}
          onClick={() => onEmojiSelect("like")}
        >
          <PiSmileyThin />
        </button>
        <span className="hakgyo text-2xl">좋아요!</span>
      </div>

      <div className="flex flex-col items-center">
        <button
          className={`text-9xl ${
            selectedEmoji === "dislike" ? "text-sub9" : "text-[#989898]"
          }`}
          onClick={() => onEmojiSelect("dislike")}
        >
          <PiSmileySadThin />
        </button>
        <span className="hakgyo text-2xl">별로예요</span>
      </div>
    </div>
  );
}

export default EmojiSelector;
