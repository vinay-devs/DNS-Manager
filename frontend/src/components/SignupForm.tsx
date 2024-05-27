import { Link } from "react-router-dom";
import { InputBox } from "./InputBox";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  FieldError,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Signup, signupSchema } from "@vinaydevs/common-dnsmanager";
import useUserActions from "../services/useUserActions";

type SubmitHandlerType = FieldValues | Signup;
export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const userActions = useUserActions();
  const onSubmit: SubmitHandler<SubmitHandlerType> = async (
    data: SubmitHandlerType
  ) => {
    console.log(data);
    const { name, email, password }: FieldValues = data;
    console.log(name, email, password);
    await userActions.signup(name, email, password);
    return data;
  };
  return (
    <div className="flex justify-center flex-grow w-full ">
      <div className=" p-8  ">
        <form
          className="flex flex-col min-w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputBox
            register={register}
            type="text"
            placeholder="Enter your name"
            name="Name"
          />
          {errors?.name && (
            <p className="text-sm pt-0 text-end text-red-600">
              {errors?.name?.message}
            </p>
          )}
          <InputBox
            register={register}
            type="email"
            placeholder="Enter your email"
            name="Email"
          />
          {errors?.email && (
            <p className="text-sm pt-0 text-end text-red-600">
              {errors?.email?.message}
            </p>
          )}
          <InputBox
            register={register}
            type="password"
            placeholder="Enter your password"
            name="Password"
          />
          {errors?.password && (
            <p className="text-sm pt-0 text-end text-red-600">
              {errors?.password?.message}
            </p>
          )}

          <input
            type="submit"
            className="bg-black mt-3 text-white p-2 px-4 text-sm rounded-md  "
          />
        </form>
        <p className="text-center mt-2">
          already have an account?{" "}
          <Link to="/signin" className="text-blue-800 underline">
            <span>click here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
