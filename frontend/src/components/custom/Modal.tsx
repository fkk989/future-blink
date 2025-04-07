import React, { createContext, CSSProperties, useContext } from "react";
import clsx from "clsx";

const ModalContext = createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  close: () => void;
} | null>(null);

const Root: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ children, className, style, isOpen, setIsOpen }) => {
  //
  const toggle = () => setIsOpen((crnt) => !crnt);
  const close = () => {
    setIsOpen(false);
  };
  //

  return (
    <ModalContext.Provider value={{ isOpen, toggle, close, setIsOpen }}>
      <div className={className} style={style}>
        {children}
      </div>
    </ModalContext.Provider>
  );
};

const Trigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({
  children,
}) => {
  const { toggle } = useContext(ModalContext)!;
  return (
    <div onClick={toggle} style={{ backgroundColor: "transparent" }}>
      {children}
    </div>
  );
};

const Content: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ children, className, style }) => {
  const { isOpen, setIsOpen } = useContext(ModalContext)!;
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)]"
      ></div>
      <div
        style={style}
        className={clsx(
          className,
          "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10"
        )}
      >
        {children}
      </div>
    </>
  );
};

export const Modal = {
  Root,
  Trigger,
  Content,
};
