import { ErrorMessage } from "@hookform/error-message";
import { Input } from "components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// !FIXME : 백에 맞춰서 바꾸기
interface BookcaseForm {
  bookcaseImage: File;
}

const BookcaseUploadPage = () => {
  const navigate = useNavigate();

  // const [open, setOpen] = useState<boolean>(false);
  // const [content, setContent] = useState<string>("");
  const [bookcaseImage, setBookcaseImage] = useState<File | undefined>(
    undefined
  );
  const [bookcaseImagePreview, setBookcaseImagePreview] = useState<
    string | null
  >(null);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<BookcaseForm>();

  const onSubmit = (data: BookcaseForm) => {
    if (bookcaseImage) {
      setBookcaseImage(data.bookcaseImage);
      setBookcaseImagePreview(URL.createObjectURL(data.bookcaseImage));

      const formData = new FormData();

      // !FIXME : 백에 맞춰서 바꾸기
      formData.append("bookcaseImage", bookcaseImage);

      console.log("formData", formData);
    }
  };

  const onInvalid = (errors: any) => {
    console.log("errors", errors);
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

  // const handleSubmit = async () => {
  //   if (bookcaseImage) {
  //     const formData = new FormData();
  //     formData.append("BookcaseImage", bookcaseImage);

  //     try {
  //       // 여기서 api 호출
  //       const response = "api 호출 결과";

  //       navigate("/apply/bookcase", { state: { bookcaseData: response } });
  //     } catch (error) {
  //       console.error("Bookcase Upload Error:", error);
  //       setOpen(true);
  //       setContent("책장 등록에 실패했습니다.");
  //     }
  //   } else {
  //     setOpen(true);
  //     setContent("책장 이미지를 등록해주세요.");
  //   }
  // };

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-6 py-4 flex flex-row items-center"
      >
        <IoChevronBack className="text-2xl" color="#545454" />
        <span className="font-bold text-2xl ml-2">도서 등록 - 책장 촬영</span>
      </div>
      <div className="w-full max-w-md p-4">
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex flex-col items-center"
        >
          <label
            htmlFor="bookcaseImage"
            className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            {bookcaseImagePreview ? (
              <img
                src={bookcaseImagePreview}
                alt="책등 미리보기"
                className="object-cover h-full w-full rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-gray-500">책등 이미지 업로드</p>
                <p className="text-gray-400">
                  (클릭하여 이미지를 선택하시거나 촬영해주세요)
                </p>
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
          {/* </div> */}
          <ErrorMessage
            errors={errors}
            name="bookcaseImage"
            render={({ message }) => (
              <p className="text-red-400 text-xs">{message}</p>
            )}
          />
          <div className="px-6">
            <button className="text-center bg-sub7 w-full mt-4 px-16 rounded-xl text-white font-bold py-3 cursor-pointer">
              책장 등록 요청
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookcaseUploadPage;
