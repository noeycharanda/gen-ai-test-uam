import { useCallback, useState } from "react";

interface UseModalOptions {
  initialPresent?: boolean;
  delayMs?: number;
}

const defaultModalOptions = {
  initialPresent: false,
};

export const useModal = (options?: UseModalOptions) => {
  const op = { ...defaultModalOptions, ...options };

  const [open, setOpen] = useState<boolean>(op.initialPresent);

  const present = useCallback(async () => {
    setOpen(true);
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    present,
    dismiss,
  };
};
