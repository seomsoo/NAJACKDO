import { IoIosSearch } from "react-icons/io";

interface IAutoSearchTextProps {
  text: string;
}

const AutoSearchText = ({ text }: IAutoSearchTextProps) => {
  return (
    <div className="mx-2 my-2 flex flex-row items-center">
      <div>
        <IoIosSearch size={25} color="#545454" />
      </div>
      <p className="ml-3 text-sm">{text}</p>
    </div>
  );
};

export default AutoSearchText;
