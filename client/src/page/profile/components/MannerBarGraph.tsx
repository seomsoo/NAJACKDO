import React from 'react';
import { GoThumbsup, GoThumbsdown } from "react-icons/go";

interface MannerBarGraphProps {
  ratio: number;
  value: number;
  label: string;
}

const iconSettings: { [key: string]: { icon: JSX.Element, color: string } } = {
  "good": { icon: <GoThumbsup size={14} color="black" />, color: "#B97070" },
  "bad": { icon: <GoThumbsdown size={14} color="black" />, color: "#709AB9" },
}

const MannerBarGraph = ({ ratio, value, label }: MannerBarGraphProps) => {
  const { icon, color } = iconSettings[label] || iconSettings["good"];
  
  return (
  <div className='flex flex-row justify-between items-center mt-4 w-[95%] mx-auto'>
    <div className='flex flex-row items-center'>
      {icon}&nbsp;
      <div
        className="h-[6px] rounded-[10px]"
        style={{ width: `${250 * ratio }px`, backgroundColor: color}}
      />

    </div>
    <p className="col-span-2 text-[10px] text-e font-normal font-['Pretendard] mr-1">{value}</p>
  </div>
  );
};

export default MannerBarGraph;
