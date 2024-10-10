import { IoLeaf } from "react-icons/io5";

interface LeafBarGraphProps {
  ratio: number;
  value: number;
  label: string;
}

const LeafBarGraph = ({ ratio, value, label }: LeafBarGraphProps) => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-2 items-center mt-4 w-full ">
        <p className="col-span-2 text-xs text-nowrap font-medium ">{label}</p>
        <div
          className="col-span-8 h-[6px] ml-1 rounded-xl bg-sub4"
          style={{ width: `${160 * ratio}px` }}
        />
        <div className="col-span-2 flex justify-end item-center">
          <p className="col-span-2 text-xs  font-medium  mr-1">
            {value.toLocaleString()}
          </p>
          <IoLeaf
            className="flex-shrink-0"
            style={{ width: "15px", height: "15px" }}
            color="#A6B37D"
          />
        </div>
      </div>
    </div>
  );
};

export default LeafBarGraph;
