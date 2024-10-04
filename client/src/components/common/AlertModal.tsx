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
    }, 2000);
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
          <DialogDescription className="h-[200px] flex items-center justify-center text-black">
            <span className="text-lg">{content}</span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
