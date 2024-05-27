import { zodResolver } from "@hookform/resolvers/zod";
import { Credentials, credentialsSchema } from "@vinaydevs/common-dnsmanager";
import { FieldError, FieldValues, useForm } from "react-hook-form";

interface credentialFormProps {
  onClose: () => void;
  setAccesKey: (value: boolean) => void;
}
type SubmitHandlerType = FieldValues | Credentials | FieldError;
export const CredentialForm = ({
  setAccesKey,
  onClose,
}: credentialFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SubmitHandlerType>({
    resolver: zodResolver(credentialsSchema),
  });
  const onSubmit = (data: SubmitHandlerType) => {
    console.log(data);
    setAccesKey(true);
    return data;
  };
  console.log(errors);
  return (
    <div>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="accessKey">
            Access Key
          </label>
          <input
            {...register("accessKey")}
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
            {...register("secretKey")}
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
  );
};
