import { HiArrowLongLeft, HiEnvelope } from "react-icons/hi2";
import FormDescription from "../../ui/FormDescription";
import FormName from "../../ui/FormName";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { trimStrings } from "../../utils/trimString";

function ForgotPasswordForm() {
  const navigate = useNavigate();
  type FormValues = {
    email: string;
  };
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { mutate: resetPassword, isPending } = useForgotPassword(() => {
    reset();
    navigate("/login");
  });
  const onSubmit = (data: { email: string }) => {
    const trimmedData = trimStrings(data);
    resetPassword(trimmedData.email);
  };

  return (
    <form
      className="flex flex-col items-center gap-6 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center mb-8">
        <FormName>Forgot your password</FormName>
        <FormDescription>
          Please enter the email address you used during registration so that we
          can send you instructions to reset your password.
        </FormDescription>
      </div>
      <Input
        placeholder="Email"
        type="email"
        id="email"
        icon={<HiEnvelope color="#667085" size={24} />}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter valid Email",
          },
        })}
      />

      <div className="w-full flex flex-col gap-3">
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
              <span>Sending...</span>
            </div>
          ) : (
            "Send reset link"
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

export default ForgotPasswordForm;
