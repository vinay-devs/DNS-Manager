import { Signin, signinSchema } from "@vinaydevs/common-dnsmanager";
import { InputBox } from "./InputBox";
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserActions from "../services/useUserActions";
type SubmitHandlerType = FieldValues | Signin | FieldError;
export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });
  const useUserAction = useUserActions();
  const onSubmit: SubmitHandler<SubmitHandlerType> = async (
    data: SubmitHandlerType
  ) => {
    const { email, password }: FieldValues = data;
    await useUserAction.signin(email, password);
    return data;
  };
  return (
    <div className="flex justify-center w-full">
      <div className="">
        <form
          className="flex flex-col min-w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputBox
            register={register}
            placeholder="Email Address"
            name="Email"
            type="email"
          />
          {errors?.email && (
            <p className="text-sm pt-0 text-end text-red-600">
              {errors?.email?.message}
            </p>
          )}
          <InputBox
            register={register}
            placeholder="Password"
            name="Password"
            type="password"
          />
          {errors?.password && (
            <p className="text-sm pt-0 text-end text-red-600">
              {errors?.password?.message}
            </p>
          )}
          <button
            className="bg-black mt-3 text-white p-2 px-4 text-sm rounded-md  "
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
