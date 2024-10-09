interface AiOnBoardingProps {
  content: string;
  onboardingImage: string;
}

const AiOnBoarding = ({ content, onboardingImage }: AiOnBoardingProps) => {
  return (
    <div className="flex flex-col items-center  ">
      <img
        src={onboardingImage}
        className="rounded-md"
        alt="onboardingImage"
        width={220}
      />
      <span
        className="text-sm font-semibold mt-1"
        dangerouslySetInnerHTML={{ __html: content }}
      ></span>
    </div>
  );
};

export default AiOnBoarding;
