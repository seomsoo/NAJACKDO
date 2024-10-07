import { GoThumbsdown, GoThumbsup } from "react-icons/go";

interface MannerBarGraphProps {
  ratio: number;
  value: number;
  label: string;
}

const iconSettings: { [key: string]: { icon: JSX.Element; color: string } } = {
  good: {
    icon: <GoThumbsup size={16} color="black" />,
    color: "#6CBFFC",
  },
  bad: { icon: <GoThumbsdown size={16} color="black" />, color: "#E17171" },
};

const MannerBarGraph = ({ ratio, value, label }: MannerBarGraphProps) => {
  const { icon, color } = iconSettings[label] || iconSettings["good"];

  return (
    <div className="flex flex-row justify-between items-center mt-4 w-[95%] mx-auto">
      <div className="flex flex-row items-center">
        {icon}&nbsp;
        <div
          className="h-2 ml-1 rounded-lg"
          style={{ width: `${250 * ratio}px`, backgroundColor: color }}
        />
      </div>
      <p className="col-span-2 text-sm  font-medium ml-4">{value}</p>
    </div>
  );
};

export default MannerBarGraph;
