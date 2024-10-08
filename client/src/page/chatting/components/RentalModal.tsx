import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "components/ui/dialog";
import { ChatRentalStep } from "page/chatting/components/ChatBookInfo";
import { IoLibrary } from "react-icons/io5";
import { MdLibraryAddCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface RentalModalProps {
  totalLeaf?: number;
  step: ChatRentalStep;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  setStep: (step: ChatRentalStep) => void;
  handleClick: () => void;
  ownerName: string;
}

const RentalModal = ({
  totalLeaf,
  step,
  setStep,
  modalOpen,
  setModalOpen,
  handleClick,
  ownerName,
}: RentalModalProps) => {
  const navigate = useNavigate();
  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(modalOpen) => {
        !modalOpen && setModalOpen(false);
      }}
    >
      {step !== ChatRentalStep.NO_LEAF && (
        <DialogTrigger
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <span className="bg-sub7 text-white rounded-lg py-3 px-4">
            {step}
          </span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-[#F1ECE3] rounded-2xl">
        <DialogTitle />
        <DialogDescription className="flex flex-col items-center space-y-7 text-center text-black text-bol">
          {step === ChatRentalStep.PAY && (
            <Fragment>
              <IoLibrary size={35} color="#5F6F52" />
              <span className="text-lg">
                {ownerName}님에게 {totalLeaf.toLocaleString()} 책잎을 <br />
                송금하시겠습니까?
              </span>
              <div className="space-x-6">
                <button
                  className="border-2 border-sub7 px-10 py-2 rounded-xl hover:bg-[#EBE9E7]"
                  onClick={() => {
                    setModalOpen(false);
                    setStep(ChatRentalStep.READY);
                  }}
                >
                  취소
                </button>
                <button
                  className="border-2 border-sub7 px-10 py-2 rounded-xl bg-sub7 hover:bg-[#6F473D] text-white"
                  onClick={handleClick}
                >
                  확인
                </button>
              </div>
            </Fragment>
          )}
          {step === ChatRentalStep.RENTED && (
            <Fragment>
              <MdLibraryAddCheck size={35} color="#776B5D" />
              <span className="text-lg">반납을 확인하시겠습니까?</span>
              <div className="space-x-6">
                <button
                  className="border-2 border-sub7 px-10 py-2 rounded-xl hover:bg-[#EBE9E7]"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  취소
                </button>
                <button
                  className="border-2 border-sub7 px-10 py-2 rounded-xl bg-sub7 hover:bg-[#4F473D] text-white"
                  onClick={handleClick}
                >
                  확인
                </button>
              </div>
            </Fragment>
          )}
          {step === ChatRentalStep.NO_LEAF && (
            <Fragment>
              <span className="text-lg">책잎이 부족합니다!</span>
              <div className="space-x-6">
                <button
                  className="border-2 border-sub7 px-10 py-2 rounded-xl hover:bg-[#EBE9E7]"
                  onClick={() => {
                    setModalOpen(false);
                    setStep(ChatRentalStep.READY);
                  }}
                >
                  닫기
                </button>
                <button
                  className="border-2 border-sub7 px-5 py-2 rounded-xl bg-sub7 hover:bg-[#4F473D] text-white"
                  onClick={() => navigate("/profile/my-leaf/charge")}
                >
                  책잎 충전하기
                </button>
              </div>
            </Fragment>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default RentalModal;
