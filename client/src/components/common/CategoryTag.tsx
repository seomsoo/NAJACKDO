import { cn } from "lib/utils";

interface categoryTagProps {
  category: string;
  className?: string;
}

const CategoryTag = ({ category, className }: categoryTagProps) => {
  return (
    <span
      className={cn(
        "bg-[#C0C78C] text-[#FEFAE0] text-sm rounded-2xl px-2 py-1 mr-1.5",
        className
      )}
    >
      {category}
    </span>
  );
};

export default CategoryTag;
