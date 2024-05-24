import { useEffect, useRef } from "react";

interface accesKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessKeyModal = ({ isOpen, onClose }: accesKeyModalProps) => {
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add Access Key</h2>
          <button
            onClick={() => onClose()}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Enter your access key and secret key to connect to our platform.
        </p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="accessKey">
              Access Key
            </label>
            <input
              id="accessKey"
              type="text"
              placeholder="Enter your access key"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="secretKey">
              Secret Key
            </label>
            <input
              id="secretKey"
              type="text"
              placeholder="Enter your secret key"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
