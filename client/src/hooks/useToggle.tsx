import { useState } from "react";

const useToggle = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const toggle = () => {
    setIsOn(!isOn);
  };
  return { isOn, toggle, setIsOn };
};

useToggle.propTypes = {};

export default useToggle;
