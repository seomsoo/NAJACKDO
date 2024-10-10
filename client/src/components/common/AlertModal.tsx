import { Button } from "components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import { on } from "events";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AlertModalProps {
  content: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  urlPath?: string;
}

const AlertModal = ({ content, open, setOpen, urlPath }: AlertModalProps) => {
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  }, []);

  const nav = useNavigate();

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        !open && setOpen(false);
      }}
    >
      <DialogContent className="bg-najackdo-background rounded-2xl">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription className="h-[150px]  flex flex-col items-center justify-center text-stone-950 font-bold">
            <span className="text-2xl hakgyo" dangerouslySetInnerHTML={{ __html: content }}></span>
            {urlPath ? (
              <Button
                className="text-base cursor-pointer mt-10 bg-sub7 font-medium text-white"
                onClick={() => nav("/library/my-bookcase")}
              >
                내 책장으로
              </Button>
            ) : (
              <span></span>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
