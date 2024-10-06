import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import { useEffect } from "react";

interface AlertModalProps {
  content: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AlertModal = ({ content, open, setOpen }: AlertModalProps) => {
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  }, []);

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
          <DialogDescription className="h-[80px] flex items-center justify-center text-stone-950 font-bold">
            <span
              className="text-2xl hakgyo"
              dangerouslySetInnerHTML={{ __html: content }}
            ></span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
