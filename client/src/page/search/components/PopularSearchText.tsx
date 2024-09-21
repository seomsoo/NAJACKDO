interface IPopularSearchTextProps {
  text: string;
}

const PopularSearchText = ({ text }: IPopularSearchTextProps) => {
  return (
    <div className="border-[1.5px] border-[#B0A695] rounded-2xl px-4 py-1">
      <p>{text}</p>
    </div>
  );
};

export default PopularSearchText;
