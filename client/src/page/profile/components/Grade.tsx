import React from 'react';

interface GradeProps {
  degree: number;
  color: string;
}

const Grade = ({ degree, color }: GradeProps) => {
  return (
    <div className="relative w-[300px]">
      <div
        className="text-[10px] font-normal  mb-2"
        style={{ marginLeft: `${3 * degree - 4}px`, color: color }}
      >
        {degree}점
      </div>
      
      <div className="w-full h-[6px] bg-white rounded-[10px] relative">
        <div
          className="h-[6px] rounded-[10px]"
          style={{ width: `${3 * degree}px`, backgroundColor: color }}
        />

        <div
          className="w-[15px] h-[15px] rounded-full blur-[1px] absolute top-[-5px]"
          style={{ marginLeft: `${3 * degree - 3}px`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default Grade;
