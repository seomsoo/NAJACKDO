interface CenterCropImageProps {
  imageUrl: string;
}

const CenterCropImage = ({ imageUrl }: CenterCropImageProps) => {
  return (
    <div className="w-full h-80 overflow-hidden absolute top-0 z-0 p-4">
      <img
        src={imageUrl}
        alt="배경 이미지"
        className="w-full h-full object-center blur-2xl "
      />
    </div>
  );
};

export default CenterCropImage;
