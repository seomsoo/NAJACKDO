import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "components/ui/dialog";
import { ChatRentalStep } from "page/chatting/components/ChatBookInfo";
import { useEffect } from "react";
import { IoLibrary } from "react-icons/io5";
import { MdLibraryAddCheck } from "react-icons/md";
import { Fragment } from "react/jsx-runtime";

interface RentalModalProps {
  totalLeaf?: number;
  step: ChatRentalStep;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  setStep: (step: ChatRentalStep) => void;
  handleClick: () => void;
}

const RentalModal = ({
  totalLeaf,
  step,
  setStep,
  modalOpen,
  setModalOpen,
  handleClick,
}: RentalModalProps) => {

  return (
    <Dialog open={modalOpen} onOpenChange={(modalOpen) => !modalOpen}>
      <DialogTrigger onClick={() => setModalOpen(true)}>
        <span className="bg-[#776B5D] text-white rounded-lg py-3 px-4">
          {step}
        </span>
      </DialogTrigger>

      <DialogContent className="bg-[#F1ECE3] rounded-2xl">
        <DialogDescription className="flex flex-col items-center space-y-7 text-center text-black text-bol">
          {step === ChatRentalStep.PAY && (
            <Fragment>
              <IoLibrary size={35} color="#5F6F52" />
              <span className="text-lg">
                정하림님에게 {totalLeaf.toLocaleString()} 책잎을 <br />
                송금하시겠습니까?
              </span>
              <div className="space-x-6">
                <button
                  className="border-2 border-[#776B5D] px-10 py-2 rounded-xl hover:bg-[#EBE9E7]"
                  onClick={() => {
                    setModalOpen(false);
                    setStep(ChatRentalStep.CHECK);
                  }}
                >
                  취소
                </button>
                <button
                  className="border-2 border-[#776B5D] px-10 py-2 rounded-xl bg-[#776B5D] hover:bg-[#6F473D] text-white"
                  onClick={handleClick}
                >
                  확인
                </button>
              </div>
            </Fragment>
          )}
          {step === ChatRentalStep.RETURN && (
            <Fragment>
              <MdLibraryAddCheck size={35} color="#776B5D" />
              <span className="text-lg">반납을 확인하시겠습니까?</span>
              <div className="space-x-6">
                <button
                  className="border-2 border-[#776B5D] px-10 py-2 rounded-xl hover:bg-[#EBE9E7]"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  취소
                </button>
                <button
                  className="border-2 border-[#776B5D] px-10 py-2 rounded-xl bg-[#776B5D] hover:bg-[#4F473D] text-white"
                  onClick={handleClick}
                >
                  확인
                </button>
              </div>
            </Fragment>
          )}
          {step === ChatRentalStep.NO_LEAF && (
            <span className="text-lg">책잎이 부족합니다!</span>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default RentalModal;
