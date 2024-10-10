import { postAiCheckBook } from "api/bookApi";
import AlertModal from "components/common/AlertModal";
import ClipLoading from "components/common/ClipLoading";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/ui/carousel";
import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const AICheckUploadPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userBookId } = location.state; // AICheckPage에서 전달받은 값

  const [open, setOpen] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<string>("");

  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(
    null
  );
  const [backImagePreview, setBackImagePreview] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (api) {
      api.on("select", () => {
        setCarouselIndex(api.selectedScrollSnap());
      });
    }
  }, [api]);

  const handleFrontImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
      setFrontImagePreview(URL.createObjectURL(file));
    }
  };

  const handleBackImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setBackImage(file);
      setBackImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (frontImage && backImage) {
      const formData = new FormData();
      formData.append("files", frontImage);
      formData.append("files", backImage);
      formData.append("user_id", userId);
      formData.append("user_book_id", userBookId);

      setIsPending(true);

      try {
        const response = await postAiCheckBook(formData);

        navigate("/ai-check/result", {
          state: { resultData: response },
        });
      } catch (error) {
        setOpen(true);
        setAlertContent("AI 인증에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsPending(false);
      }
    } else {
      setOpen(true);
      setAlertContent("이미지를 모두 업로드해주세요.");
    }
  };

  return (
    <div>
      {open && (
        <AlertModal open={open} setOpen={setOpen} content={alertContent} />
      )}
      {isPending ? (
        <div className="flex items-center justify-center h-[500px]">
          <ClipLoading />
        </div>
      ) : (
        <>
          <div
            onClick={() => navigate(-1)}
            className="cursor-pointer p-6 py-4 flex flex-row items-center"
          >
            <IoChevronBack className="text-2xl" color="#545454" />
            <span className="font-bold text-2xl ml-2">도서 등록 - AI 인증</span>
          </div>
          <Carousel className="w-full max-w-md p-4 pt-6" setApi={setApi}>
            <CarouselContent>
              <CarouselItem className="flex flex-col items-center">
                <label
                  htmlFor="front-image-upload"
                  className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  {frontImagePreview ? (
                    <img
                      src={frontImagePreview}
                      alt="도서 앞면 미리보기"
                      className="object-cover h-full w-full rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <p className="text-gray-500">도서 앞면 이미지 업로드</p>
                      <p className="text-gray-400">
                        (클릭하여 이미지를 선택하시거나 촬영해주세요)
                      </p>
                    </div>
                  )}
                  <input
                    id="front-image-upload"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFrontImageUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-2xl mt-5 font-medium">앞면</span>
              </CarouselItem>

              <CarouselItem className="flex flex-col items-center">
                <label
                  htmlFor="back-image-upload"
                  className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  {backImagePreview ? (
                    <img
                      src={backImagePreview}
                      alt="도서 뒷면 미리보기"
                      className="object-cover h-full w-full rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <p className="text-gray-500">도서 뒷면 이미지 업로드</p>
                      <p className="text-gray-400">
                        (클릭하여 이미지를 선택하시거나 촬영해주세요)
                      </p>
                    </div>
                  )}
                  <input
                    id="back-image-upload"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleBackImageUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-2xl mt-5 font-medium">뒷면</span>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>

          <div className="flex justify-center">
            <FaCircle
              size={10}
              className="mr-3"
              color={carouselIndex === 0 ? "#000000" : "#888888"}
            />
            <FaCircle
              size={10}
              color={carouselIndex === 1 ? "#000000" : "#888888"}
            />
          </div>

          <div className="px-6">
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="text-center bg-sub7 w-full mt-6 rounded-xl text-white font-bold py-3 cursor-pointer"
            >
              AI 인증 요청
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AICheckUploadPage;
