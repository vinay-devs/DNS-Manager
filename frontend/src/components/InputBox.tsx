type inputProps = {
  name: string;
  placeholder: string;
  type: string;
};

export const InputBox = ({ name, placeholder, type }: inputProps) => {
  return (
    <div className="flex flex-col pb-4">
      <label htmlFor="name">{name}</label>
      <input
        className="p-2 mt-1 border border-gray-300 rounded-md w-full"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
