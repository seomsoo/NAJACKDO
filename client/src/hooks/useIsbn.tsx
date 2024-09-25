import { useState } from "react";

const useIsbn = () => {
  const [isbn, setIsbn] = useState<string | null>(null);

  const reset = () => {
    setIsbn(null);
  };

  return {
    isbn,
    setIsbn,
    reset,
  };
};

export default useIsbn;
