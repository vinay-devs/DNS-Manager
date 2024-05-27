import { useEffect, useRef } from "react";

interface accesKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: accesKeyModalProps) => {
  const modalRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = (e: Event) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
};
