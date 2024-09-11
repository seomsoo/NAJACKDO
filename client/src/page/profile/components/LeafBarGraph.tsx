import React from 'react';
import { IoLeaf } from "react-icons/io5";

interface LeafBarGraphProps {
  ratio: number;
  value: number;
  label: string;
}

const LeafBarGraph = ({ ratio, value, label }: LeafBarGraphProps) => {
  return (
  <div>
    <div className="grid grid-cols-12 gap-2 items-center mt-4 w-[95%] mx-auto">
      <p className="col-span-2 text-[10px] font-normal font-['Pretendard]">{label}</p>
      <div
        className="col-span-8 h-[6px] rounded-[2px] bg-[#B99470]"
        style={{ width: `${180 * ratio }px`}}
      />
      <div className='col-span-2 flex justify-end item-center'>
        <p className="col-span-2 text-[10px] text-e font-normal font-['Pretendard] mr-1">{value.toLocaleString()}</p>
        <IoLeaf size={14} color="#A6B37D"/>
      </div>
    </div>
  </div>
  );
};

export default LeafBarGraph;
