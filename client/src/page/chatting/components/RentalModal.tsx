import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "components/ui/dialog";
import { ChatRentalStep } from "page/chatting/components/ChatBookInfo";
import { IoLibrary } from "react-icons/io5";
import { MdLibraryAddCheck } from "react-icons/md";

interface RentalModalProps {
  step: ChatRentalStep;
  isOwner: boolean;
}

const RentalModal = ({ step, isOwner }: RentalModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="bg-[#776B5D] text-white rounded-lg py-3 px-4">
          {step}
        </span>
      </DialogTrigger>
      <DialogContent className="bg-[#F1ECE3] rounded-2xl">
        <DialogDescription className="flex flex-col items-center space-y-7 text-center text-black text-bol">
          {step === ChatRentalStep.PAY && (
            <>
              <IoLibrary size={35} color="#5F6F52" />
              <span className="text-lg">
                정하림님에게 5,000 책잎을 <br />
                송금하시겠습니까?
              </span>
              <div className="space-x-6">
                <button className="border-2 border-[#776B5D] px-10 py-2 rounded-xl hover:bg-[#EBE9E7]">
                  취소
                </button>
                <button className="border-2 border-[#776B5D] px-10 py-2 rounded-xl bg-[#776B5D] hover:bg-[#6F473D] text-white">
                  확인
                </button>
              </div>
            </>
          )}
          {step === ChatRentalStep.RETURN && (
            <>
              <MdLibraryAddCheck size={35} color="#776B5D" />
              <span className="text-lg">반납을 확인하시겠습니까?</span>
              <div className="space-x-6">
                <button className="border-2 border-[#776B5D] px-10 py-2 rounded-xl hover:bg-[#EBE9E7]">
                  취소
                </button>
                <button className="border-2 border-[#776B5D] px-10 py-2 rounded-xl bg-[#776B5D] hover:bg-[#4F473D] text-white">
                  확인
                </button>
              </div>
            </>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default RentalModal;
