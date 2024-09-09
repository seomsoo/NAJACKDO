interface categoryTagProps {
  category: string;
}

const CategoryTag = ({ category }: categoryTagProps) => {
  return (
    <span className="bg-[#C0C78C] text-[#FEFAE0] text-sm rounded-2xl px-2 py-1 mr-1.5">
      {category}
    </span>
  );
};

export default CategoryTag;
