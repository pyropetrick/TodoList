import { useCallback, useState } from "react";

export const useToggle = (
  initValue: boolean = false
): [value: boolean, toogle: () => void] => {
  const [value, setValue] = useState<boolean>(initValue);
  const toogle = useCallback(() => setValue((prevValue) => !prevValue), []);
  return [value, toogle];
};
