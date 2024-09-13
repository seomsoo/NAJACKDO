import { FaCheck } from 'react-icons/fa';

type CheckboxGroupProps = {
  selectedEmoji: 'like' | 'dislike';
  checkedItems: {
    [key in 'clean' | 'punctual' | 'polite' | 'responsive']: boolean;
  };
  checkboxOptions: {
    id: 'clean' | 'punctual' | 'polite' | 'responsive';
    label: string;
  }[];
  onCheckboxChange: (
    item: 'clean' | 'punctual' | 'polite' | 'responsive'
  ) => void;
  isAnyChecked: boolean;
};

function CheckboxGroup({
  selectedEmoji,
  checkedItems,
  checkboxOptions,
  onCheckboxChange,
  isAnyChecked,
}: CheckboxGroupProps) {
  return (
    <div className='gap-2 flex flex-col'>
      <div className='font-semibold text-lg pt-7 pb-4'>
        <span>
          {selectedEmoji === 'like'
            ? '어떤 점이 좋았나요?'
            : '어떤 점이 별로였나요?'}
        </span>
      </div>

      {checkboxOptions.map((option) => (
        <div key={option.id} className='flex items-center gap-2'>
          <input
            type='checkbox'
            id={option.id}
            className='hidden peer'
            checked={checkedItems[option.id]}
            onChange={() => onCheckboxChange(option.id)}
          />
          <label
            htmlFor={option.id}
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
              checkedItems[option.id]
                ? 'border-[#5F6F52] bg-[#5F6F52]'
                : 'border-gray-400'
            }`}
          >
            {checkedItems[option.id] && (
              <FaCheck className='text-white w-4 h-4' />
            )}
          </label>
          <span className='text-sm font-medium'>{option.label}</span>
        </div>
      ))}

      <button
        className={`font-bold bg-[#776B5D] text-white w-full text-lg mt-8 py-3 rounded-lg ${
          isAnyChecked ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
        }`}
        disabled={!isAnyChecked}
      >
        후기 보내기
      </button>
    </div>
  );
}

export default CheckboxGroup;
