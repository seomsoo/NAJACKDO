import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface GradeInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const GradeInfoModal = ({ open, setOpen }: GradeInfoModalProps) => {
  const navigate = useNavigate();
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        !open && setOpen(false);
      }}
    >
      <DialogContent className="bg-najackdo-background rounded-2xl h-[400px] w-[340px]">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription className="text-start text-black">
            <div>
              <p className="font-extrabold text-xl text-center">
                신뢰 나무 점수 안내
              </p>
              <div className="w-full border border-[#b0a695] my-2" />
              <p className="font-bold text-[16px] mt-5">
                나작도 멤버의 신뢰 지표
              </p>
              <p className="text-[13px] mt-1">
                신뢰 나무는 나작도 멤버의 신뢰도를 한눈에 파악할 수 있는
                지표입니다. 처음 50점에서 시작하여, 다양한 활동을 통해 받은
                리뷰에 따라 0점에서 100점 사이에서 변동하게 됩니다.
              </p>
              <p className="font-bold text-[16px] mt-5">
                구간별 신뢰 뱃지 변화
              </p>
              <div className="flex justify-between items-end gap-[12px] mt-5">
                <div className="flex flex-col justify-center">
                  <img className="w-[45px]" src="/images/mannertree/씨앗.png" />
                  <p className="mt-4 text-center text-[16px] hakgyo">Lv.1</p>
                  <p className="text-center text-[14px] hakgyo">나작씨앗</p>
                  <p className="text-center text-[16px] hakgyo">0-19</p>
                </div>
                <div className="flex flex-col justify-center">
                  <img className="w-[45px]" src="/images/mannertree/새싹.png" />
                  <p className="mt-4 text-center text-[16px] hakgyo">Lv.2</p>
                  <p className="text-center text-[14px] hakgyo">나작새싹</p>
                  <p className="text-center text-[16px] hakgyo">20-39</p>
                </div>
                <div className="flex flex-col justify-center">
                  <img className="w-[45px]" src="/images/mannertree/가지.png" />
                  <p className="mt-4 text-center text-[16px] hakgyo">Lv.3</p>
                  <p className="text-center text-[14px] hakgyo">나작가지</p>
                  <p className="text-center text-[16px] hakgyo">40-59</p>
                </div>
                <div className="flex flex-col justify-center">
                  <img className="w-[45px]" src="/images/mannertree/나무.png" />
                  <p className="mt-4 text-center text-[16px] hakgyo">Lv.4</p>
                  <p className="text-center text-[14px] hakgyo">나작나무</p>
                  <p className="text-center text-[16px] hakgyo">60-79</p>
                </div>
                <div className="flex flex-col justify-center">
                  <img className="w-[45px]" src="/images/mannertree/숲.png" />
                  <p className="mt-4 text-center text-[16px] hakgyo">Lv.5</p>
                  <p className="text-center text-[14px] hakgyo">나작숲</p>
                  <p className="text-center text-[16px] hakgyo">80-100</p>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GradeInfoModal;
