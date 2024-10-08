import { ErrorMessage } from "@hookform/error-message";
import { Input } from "components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { postBookCaseImage } from "api/bookcaseApi";
import { useMutation } from "@tanstack/react-query";
import { IBookDetail } from "atoms/Book.type";

interface BookcaseForm {
  bookcaseImage: File;
}

const BookcaseUploadPage = () => {
  const navigate = useNavigate();
  const [bookcaseImage, setBookcaseImage] = useState<File | undefined>(undefined);
  const [bookcaseImagePreview, setBookcaseImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookcaseForm>();

  const { mutate, error } = useMutation<IBookDetail[], Error, FormData>({
    mutationFn: postBookCaseImage,
    onSuccess: (recognizedBooks) => {
      console.log("recognizedBooks", recognizedBooks);
      navigate("/bookcase/apply", { state: { recognizedBooks } });
    },
    onError: (error) => {
      console.error("Error recognizing books:", error);
    },
  });

  const onSubmit = (data: BookcaseForm) => {
    if (bookcaseImage) {
      const formData = new FormData();
      formData.append("file", bookcaseImage);
      console.log("FormData:", formData.get("file"));
      mutate(formData);
    }
  };

  const handleBookcaseUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files === null || files.length === 0) {
      return;
    }

    const file = files[0];
    setBookcaseImage(file);
    setBookcaseImagePreview(URL.createObjectURL(file));

    console.log("bookcase file", file);
  };

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-6 py-4 flex flex-row items-center"
      >
        <IoChevronBack className="text-2xl" color="#545454" />
        <span className="font-bold text-2xl ml-2">도서 등록 - 책장 촬영</span>
      </div>

      <div className="w-full h-[500px] max-w-md p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center h-full space-y-4"
        >
          <div className="w-full flex flex-col items-center">
            <label
              htmlFor="bookcaseImage"
              className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              {bookcaseImagePreview ? (
                <div className="w-full h-[300px]">
                  <img
                    src={bookcaseImagePreview}
                    alt="책등 미리보기"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full h-[300px] flex flex-col items-center justify-center text-center">
                  <p className="text-gray-500">책등 이미지 업로드</p>
                  <p className="text-gray-400">(클릭하여 이미지를 선택하시거나 촬영해주세요)</p>
                </div>
              )}
              <Input
                id="bookcaseImage"
                name="bookcaseImage"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleBookcaseUpload}
                className="hidden"
                register={register("bookcaseImage", {
                  required: "책장 이미지를 등록해주세요.",
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="bookcaseImage"
              render={({ message }) => <p className="text-red-400 text-xs mt-2">{message}</p>}
            />
          </div>
          <div className="px-6">
            <button
              type="submit"
              className="text-center bg-sub7 w-full mt-10 rounded-xl text-white font-bold py-3 px-16 cursor-pointer"
            >
              AI 인증 요청
            </button>
          </div>
          {error && <p className="text-red-500">Error: 이미지 업로드 실패</p>}
        </form>
      </div>
    </div>
  );
};

export default BookcaseUploadPage;
