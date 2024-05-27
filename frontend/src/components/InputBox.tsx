import { FieldValues, UseFormRegister } from "react-hook-form";

type inputProps = {
  name: string;
  placeholder: string;
  type: string;
  register: UseFormRegister<FieldValues>;
};

export const InputBox = ({ register, name, placeholder, type }: inputProps) => {
  return (
    <div className="flex flex-col ">
      <label htmlFor="name" className="mt-2">
        {name}
      </label>
      <input
        {...register(name.toLowerCase())}
        className="p-2 mt-1 border border-gray-300 rounded-md w-full"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
