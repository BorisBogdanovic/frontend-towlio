import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { RegisterFormData } from "../../types/auth";
import { HiEnvelope, HiEye, HiEyeSlash, HiLockClosed } from "react-icons/hi2";
import Button from "../../ui/Button";
import RegisterDropdown from "../../ui/RegisterDropdown";
import FormDescription from "../../ui/FormDescription";
import FormName from "../../ui/FormName";
import Input from "../../ui/Input";
import Logo from "../../ui/Logo";
import FullPageSpinner from "../../ui/FullPageSpinner";
import { useRegister } from "../../hooks/useRegister";
import { useCheckInviteToken } from "../../hooks/useCheckInviteToken";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [checkboxError, setCheckboxError] = useState<string | null>(null);

  const { email, name, last_name, token } = useParams();
  const navigate = useNavigate();

  const registerMutation = useRegister();
  const isLoading = registerMutation.isPending;

  // React Hook Form setup
  const {
    register,
    watch,
    formState: { errors },
    trigger,
    handleSubmit,
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: email ?? "",
    },
  });

  // Watch for password confirmation validation
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("password_confirmation");

  useEffect(() => {
    if (confirmPasswordValue) {
      trigger("password_confirmation");
    }
  }, [passwordValue, confirmPasswordValue, trigger]);

  // Validate the invite token
  const { data, error, isPending } = useCheckInviteToken(token ?? "");

  // If no token, redirect to expired link page
  if (!token) return <Navigate to="/link-expired" replace />;

  // While checking the token, show loading spinner
  if (isPending) return <FullPageSpinner />;

  // If invalid token or error, redirect
  if (!data?.status || error) return <Navigate to="/link-expired" replace />;

  // Custom validation for city and checkbox
  const validateForm = () => {
    let valid = true;

    if (!selectedCity) {
      setCityError("Please select a city");
      valid = false;
    } else {
      setCityError(null);
    }

    if (!isChecked) {
      setCheckboxError("You must agree to the Legal & Privacy terms");
      valid = false;
    } else {
      setCheckboxError(null);
    }

    return valid;
  };

  // Form submission handler
  const onSubmit = (formData: RegisterFormData) => {
    if (!validateForm() || !token) return;

    registerMutation.mutate(
      {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        city: selectedCity!,
        token,
      },
      {
        onSuccess: () => navigate("/login"),
      }
    );
  };

  return (
    <div className="w-[560px] relative z-10 bg-white flex-col items-center justify-center rounded-sm shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] py-4 px-20">
      <div className="pt-4 pb-8 px-7">
        {/* Logo */}
        <div className="py-8 flex justify-center">
          <Logo />
        </div>

        {/* Registration form */}
        <form
          className="flex flex-col items-center gap-2 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormName>Welcome to Towlio</FormName>
          <FormDescription>
            Welcome to the Towlio platform,{" "}
            <span className="font-bold">
              {name} {last_name}
            </span>
          </FormDescription>

          <div className="w-full">
            <Input
              placeholder="Email"
              type="email"
              id="email"
              disabled
              icon={<HiEnvelope color="#667085" size={24} />}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter valid Email",
                },
              })}
            />
            <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
              {errors.email?.message || "\u00A0"}
            </span>
          </div>

          <div className="w-full">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              icon={<HiLockClosed color="#667085" size={24} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <HiEyeSlash color="#667085" size={24} />
                  ) : (
                    <HiEye color="#667085" size={24} />
                  )}
                </button>
              }
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: {
                  hasLowercase: (v) =>
                    /[a-z]/.test(v) ||
                    "Password must contain at least one lowercase letter",
                  hasUppercase: (v) =>
                    /[A-Z]/.test(v) ||
                    "Password must contain at least one uppercase letter",
                  hasNumber: (v) =>
                    /[0-9]/.test(v) ||
                    "Password must contain at least one number",
                  hasSpecialChar: (v) =>
                    /[@$!%*#?&]/.test(v) ||
                    "Password must contain at least one special character (@$!%*#?&)",
                },
              })}
            />
            <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
              {errors.password?.message || "\u00A0"}
            </span>
          </div>
          <div className="w-full">
            <Input
              placeholder="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              icon={<HiLockClosed color="#667085" size={24} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <HiEyeSlash color="#667085" size={24} />
                  ) : (
                    <HiEye color="#667085" size={24} />
                  )}
                </button>
              }
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
            />
            <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
              {errors.password_confirmation?.message || "\u00A0"}
            </span>
          </div>
          <div className="w-full">
            <RegisterDropdown
              selectedValue={selectedCity}
              onSelect={(id) => {
                setSelectedCity(id);
                setCityError(null);
              }}
            />
            <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
              {cityError || "\u00A0"}
            </span>
          </div>

          {/* Terms and conditions checkbox */}

          <div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                  setCheckboxError(null);
                }}
              />
              <p className="text-[14px] font-regular leading-[20px] text-[#344054]">
                I agree with everything stated in the{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-[5px]"
                >
                  Legal & Privacy
                </a>
              </p>
            </div>

            <span className="text-bdoRed text-sm mt-1 block min-h-[20px]">
              {checkboxError || "\u00A0"}
            </span>
          </div>

          {/* Submit button */}
          <Button htmlType="submit" type="main">
            <span className="flex items-center gap-2 whitespace-nowrap">
              {isLoading && (
                <Ring2
                  size="24"
                  stroke="3"
                  strokeLength="0.25"
                  bgOpacity="0.1"
                  speed="0.8"
                  color=""
                />
              )}
              {isLoading ? "Creating account..." : "Register"}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
