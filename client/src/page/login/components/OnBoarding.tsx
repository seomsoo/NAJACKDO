interface OnBoardingProps {
  title: string;
  content: string;
  onboardingImage: string;
}

const OnBoarding = ({ title, content, onboardingImage }: OnBoardingProps) => {
  return (
    <div className="flex flex-col justify-between mt-5">
      <div>
        <p className="hakgyo text-4xl my-8">{title}</p>
        <span
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: content }}
        ></span>
      </div>
      <img src={onboardingImage} alt="onboardingImage" width={290} />
    </div>
  );
};

export default OnBoarding;
