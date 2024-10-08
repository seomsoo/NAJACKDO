import { useMutation, useQuery } from "@tanstack/react-query";
import { getCartList, postAddCartItem } from "api/cartApi";
import { IBookCase } from "atoms/BookCase.type";
import { ICartList } from "atoms/Cart.type";
import AlertModal from "components/common/AlertModal";
import ClipLoading from "components/common/ClipLoading";
import ConfirmModal from "components/common/ConfirmModal";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type OtherBookGridProps = {
  books: IBookCase["displayBooks"];
  checked?: boolean[];
  onCheck?: (index: number) => void;
  setChecked: (checked: boolean[]) => void;
};

const OtherBookGrid = ({
  books,
  checked,
  onCheck,
  setChecked,
}: OtherBookGridProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // 카트에 담긴 책 정보 불러오기
  const { data: cartList, isLoading: isCartLoading } = useQuery<ICartList[]>({
    queryKey: ["cartList"],
    queryFn: getCartList,
  });

  const cartBookTitles =
    cartList?.flatMap((cart) => cart.cartItems.map((item) => item.bookTitle)) ||
    [];

  // 이미지를 3개씩 묶는 함수
  const chunkArray = (
    arr: IBookCase["displayBooks"],
    size: number
  ): IBookCase["displayBooks"][] => {
    const result: IBookCase["displayBooks"][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const bookChunks = chunkArray(books, 3);

  // 책 상태에 따른 뱃지 렌더링 함수
  const renderBadge = (bookStatus: string) => {
    if (bookStatus === "AVAILABLE") {
      return (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-main p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1">
          대여 가능
        </span>
      );
    } else if (
      bookStatus === "UNAVAILABLE" ||
      bookStatus === "RENTED" ||
      bookStatus === "NOT_INSPECTED"
    ) {
      return (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-sub9 p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1">
          대여 불가
        </span>
      );
    }
    return null;
  };

  // 책 이미지 클릭함수
  const handleBookClick = (book: IBookCase["displayBooks"][0]) => {
    if (book.bookStatus === "AVAILABLE") {
      navigate(`/book/${book.userBookId}/rental`);
    } else {
      navigate(`/book/${book.bookId}`);
    }
  };

  // 선택된 책이 있는지 확인하는 변수
  const isAnyChecked = checked?.some((isChecked) => isChecked);

  // 담기 기능을 위한 useMutation
  const mutation = useMutation({
    mutationFn: (ownerBookIds: number[]) => {
      return Promise.all(ownerBookIds.map((id) => postAddCartItem(id)));
    },
    onSuccess: () => {
      setStatus("confirm");
      setContent("장바구니에 추가되었습니다.");
      setOpen(true);
    },
    onError: (error) => {
      setStatus("alert");
      setContent("이미 장바구니에 담긴 책입니다.");
      setOpen(true);
    },
  });

  // 담기 버튼 클릭 시 장바구니에 추가하는 함수
  const handleAddToCart = () => {
    const selectedBooks = books
      .filter((_, index) => checked?.[index])
      .map((book) => book.userBookId);

    if (selectedBooks.length > 0) {
      mutation.mutate(selectedBooks);
    }
  };

  // 취소 버튼 클릭 시 체크박스 상태 초기화 및 모달 닫기
  const handleCancel = () => {
    // 체크박스를 모두 해제하는 로직
    const resetChecked = new Array(checked.length).fill(false);
    setChecked(resetChecked); // 체크 상태 초기화
  };

  if (isCartLoading) return <ClipLoading />;
  return (
    <>
      {bookChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="mb-9">
          <div className="grid grid-cols-3 gap-4">
            {chunk.map((book, index) => {
              const isInCart = cartBookTitles.includes(book.bookTitle); // 카트에 담긴 책인지 확인
              return (
                <div key={book.bookId} onClick={() => handleBookClick(book)}>
                  {/* 항상 공간을 차지하되, bookStatus가 AVAILABLE일 때만 체크박스를 표시 */}
                  <div className="mb-1 ml-2">
                    <input
                      type="checkbox"
                      id={`check-${chunkIndex * 3 + index}`}
                      className={`hidden peer ${book.bookStatus === "AVAILABLE" && !isInCart ? "" : "invisible"}`} // bookStatus가 AVAILABLE이고, 카트에 없는 경우만 체크박스 표시
                      checked={checked?.[chunkIndex * 3 + index]}
                      onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
                      onChange={() => onCheck?.(chunkIndex * 3 + index)}
                    />
                    <label
                      htmlFor={`check-${chunkIndex * 3 + index}`}
                      className={`flex items-center justify-center w-7 h-7 border-2 rounded-lg cursor-pointer ${
                        checked?.[chunkIndex * 3 + index]
                          ? "border-main bg-main"
                          : "border-gray-400"
                      } ${book.bookStatus !== "AVAILABLE" || isInCart ? "invisible" : ""}`} // bookStatus가 AVAILABLE이 아니거나 카트에 담긴 책일 경우 숨김
                      onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
                    >
                      {checked?.[chunkIndex * 3 + index] && (
                        <FaCheck className="text-white w-4 h-4" />
                      )}
                    </label>
                  </div>
                  <div className="flex flex-col items-center relative">
                    <img
                      src={book.cover}
                      alt={`book-${index}`}
                      className="w-20 h-28 object-cover shadow-book-shadow rounded-r-lg rounded-br-lg"
                    />
                    {renderBadge(book.bookStatus)}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <img src="/images/Library/bar.png" alt="bar" className="w-full" />
          </div>
        </div>
      ))}

      {/* 선택된 책이 있을 때만 모달 표시 */}
      {isAnyChecked && (
        <aside className="fixed bottom-20 font-semibold w-full max-w-[430px] text-white flex text-lg justify-around rounded-t-xl items-center bg-sub7">
          <button className="px-12 ml-6 p-8" onClick={handleCancel}>
            취소
          </button>
          <span className="ml-3">|</span>
          <button className="p-8" onClick={handleAddToCart}>
            장바구니 추가
          </button>
        </aside>
      )}
      {status === "alert" ? (
        <AlertModal content={content} open={open} setOpen={setOpen} />
      ) : (
        <ConfirmModal
          content={content}
          open={open}
          setOpen={setOpen}
          urlPath="/cart"
        />
      )}
    </>
  );
};

export default OtherBookGrid;
