import {
  HiArrowLongLeft,
  HiEye,
  HiEyeSlash,
  HiLockClosed,
} from "react-icons/hi2";
import FormDescription from "../../ui/FormDescription";
import FormName from "../../ui/FormName";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { validatePassword } from "../../utils/validatePassword";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResetForgotPassword } from "../../hooks/useResetForgotPassword";
import toast from "react-hot-toast";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";

type FormValues = {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
};

function ResetPasswordForm() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const tokenFromUrl = params.get("token") || "";
  const emailFromUrl = params.get("email") || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: emailFromUrl,
      token: tokenFromUrl,
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: resetForgotPassword, isPending } = useResetForgotPassword();

  const onSubmit = (data: FormValues) => {
    resetForgotPassword(
      {
        email: data.email,
        password: data.newPassword.trim(),
        password_confirmation: data.confirmPassword.trim(),
        token: data.token,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successful! Please login.");
          navigate("/login");
        },
        onError: (error) => {
          toast.error(error?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <form
      className="flex flex-col items-center gap-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center mb-8 text-center">
        <FormName>New password</FormName>
        <FormDescription>
          Enter your new password. If you reached this screen by mistake, please
          return to the login page.
        </FormDescription>
      </div>
      <div className="w-full">
        <Input
          placeholder="New Password"
          type={showPassword ? "text" : "password"}
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^\S*$/,
              message: "Password cannot contain spaces",
            },
            validate: (val) =>
              validatePassword(val) || "Password does not meet criteria",
          })}
          icon={<HiLockClosed color="#667085" size={24} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <HiEyeSlash color="#667085" size={24} />
              ) : (
                <HiEye color="#667085" size={24} />
              )}
            </button>
          }
        />

        <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
          {errors.newPassword?.message || "\u00A0"}
        </span>
      </div>
      <div className="w-full">
        <Input
          placeholder="Confirm New Password"
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: "Please confirm your new password",
            validate: (val) =>
              val === watch("newPassword") || "Passwords do not match",
          })}
          icon={<HiLockClosed color="#667085" size={24} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="focus:outline-none"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <HiEyeSlash color="#667085" size={24} />
              ) : (
                <HiEye color="#667085" size={24} />
              )}
            </button>
          }
        />

        <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
          {errors.confirmPassword?.message || "\u00A0"}
        </span>
      </div>
      <div className="w-full flex flex-col gap-3 mt-6">
        <Button type="main" htmlType="submit" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Ring2
                size="24"
                stroke="3"
                strokeLength="0.25"
                bgOpacity="0.1"
                speed="0.8"
                color="#21409a"
              />
              <span>Saving...</span>
            </div>
          ) : (
            "Create a password"
          )}
        </Button>
        <Button
          type="secondary"
          onClick={() => navigate("/login")}
          htmlType="button"
        >
          <HiArrowLongLeft />
          Back to login
        </Button>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
