import { IAutoSearch } from "atoms/Search.type";
import AutoSearchText from "page/search/components/AutoSearchText";

interface IAutoSearchProps {
  autoSearch: IAutoSearch[];
}

const AutoSearch = ({ autoSearch }: IAutoSearchProps) => {
  console.log("AutoSearch", autoSearch);
  return (
    <div className="my-2 flex flex-col">
      {autoSearch.length === 0 ? (
        <></>
      ) : (
        autoSearch.map((search, index) => (
          <AutoSearchText key={index} text={search.value} />
        ))
      )}
    </div>
  );
};

export default AutoSearch;