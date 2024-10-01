import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecentSearch } from "api/searchApi";
import { IoMdTime } from "react-icons/io";
import { PiXBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface IRecentSearchTextProps {
  text: string;
}

const RecentSearchText = ({ text }: IRecentSearchTextProps) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deleteSearch = useMutation({
    mutationKey: ["search", "delete"],
    mutationFn: (keyword: string) => deleteRecentSearch(keyword),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["search", "recent"],
      });
    },
  });

  const handleClick = async () => {
    await deleteSearch.mutate(text);
  };

  return (
    <div className="mx-2 my-4 flex flex-row justify-between">
      <div className="flex flex-row cursor-pointer">
        <IoMdTime size={25} color="#545454" />
        <span
          className="ml-3"
          onClick={() => navigate(`/search/result?keyword=${text}`)}
        >
          {text}
        </span>
      </div>
      <div onClick={handleClick}>
        <PiXBold color="#545454" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default RecentSearchText;
