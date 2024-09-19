import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Input } from "components/ui/input";
import TextApplyResult from "page/library/components/TextApplyResult";
import { IoIosSearch } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";

const bookInfo = {
  title: "해리포터와 마법사의 돌 1(해리포터 20주년 개정판)",
  author: ["J.K. 롤링 글", "강동혁 번역"],
  category: ["드라마", "영화", "판타지"],
  imageUrl: "/harrypotter.png",
};

const TextApply = () => {
  return (
    <Dialog>
      <DialogTrigger className="flex flex-row items-center cursor-pointer">
        <LuPencilLine size={20} className="mr-3" />
        <span>텍스트로 등록</span>
      </DialogTrigger>
      <DialogContent className="bg-[#F1ECE3] rounded-xl border-none h-3/5">
        <DialogHeader>
          <DialogTitle>도서 등록 - 텍스트</DialogTitle>
          <DialogDescription className="relative py-3">
            <Input
              className="bg-white border-none text-black"
              placeholder="등록할 도서의 제목을 입력해주세요."
            />
            {/* 나중에 클릭 이벤트 넣기 */}
            <div>
              <IoIosSearch
                className="absolute top-[18px] right-2"
                size={20}
                color="black"
              />
            </div>
          </DialogDescription>
          {/* 검색 결과 리스트 */}
          <div
            className="flex-grow overflow-y-auto space-y-4"
            style={{
              height: "calc(100vh - 510px)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {Array(10)
              .fill(null)
              .map((_, index) => {
                return <TextApplyResult key={index} book={bookInfo} />;
              })}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TextApply;
