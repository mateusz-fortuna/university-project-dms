import { useLocalStorage, useOrientation } from "react-use";

export const useIsDrawerOpen = () => {
  const { type } = useOrientation();
  const isLandscapeOrientation = type.includes("landscape");

  const [isOpen, setIsOpen] = useLocalStorage(
    "isDrawerOpen",
    isLandscapeOrientation
  );

  return [isOpen ?? true, setIsOpen] as const;
};
