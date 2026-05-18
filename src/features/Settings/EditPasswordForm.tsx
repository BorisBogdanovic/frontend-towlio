import { useState } from "react";
import Input from "../../ui/Input";
import { HiEye, HiEyeSlash, HiLockClosed } from "react-icons/hi2";
import { validatePassword } from "../../utils/validatePassword";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../../hooks/useEditPassword";
import Button from "../../ui/Button";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { UpdatePasswordInput } from "../../types/user";

function EditPasswordForm({ onSuccess }: { onSuccess: () => void }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, watch, reset } =
    useForm<UpdatePasswordInput>();

  const { mutate: editPassword, isPending: isChangingPassword } =
    useUpdatePassword();

  const onSubmit = (data: UpdatePasswordInput) => {
    if (data.password !== data.password_confirmation) return;
    if (!validatePassword(data.password)) return;

    editPassword(
      {
        current_password: data.current_password,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },
      {
        onSuccess: () => {
          reset();
          onSuccess();
        },
      },
    );
  };

  const currentPassword = watch("current_password");
  const newPassword = watch("password");
  const confirmPassword = watch("password_confirmation");

  const isDisabled =
    !currentPassword ||
    !newPassword ||
    !confirmPassword ||
    newPassword !== confirmPassword ||
    !validatePassword(newPassword);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* INPUTS */}
      <div className="flex w-full flex-col gap-4">
        <Input
          placeholder="Current Password"
          type={showCurrentPassword ? "text" : "password"}
          {...register("current_password", { required: true })}
          icon={<HiLockClosed size={20} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
            >
              {showCurrentPassword ? (
                <HiEyeSlash size={20} />
              ) : (
                <HiEye size={20} />
              )}
            </button>
          }
        />

        <Input
          placeholder="New Password"
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: true,
            minLength: 8,
            validate: (val) => validatePassword(val),
          })}
          icon={<HiLockClosed size={20} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
            </button>
          }
        />

        <Input
          placeholder="Confirm New Password"
          type={showConfirmPassword ? "text" : "password"}
          {...register("password_confirmation", {
            required: true,
            validate: (val) =>
              val === watch("password") || "Passwords do not match",
          })}
          icon={<HiLockClosed size={20} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <HiEyeSlash size={20} />
              ) : (
                <HiEye size={20} />
              )}
            </button>
          }
        />
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-end gap-3 border-t border-disabledBorderGray pt-4">
        <Button
          type="secondary"
          onClick={() => {
            reset();
            onSuccess();
          }}
        >
          Cancel
        </Button>

        <Button type="main" htmlType="submit" disabled={isDisabled}>
          {isChangingPassword ? (
            <div className="flex items-center gap-2">
              <Ring2
                size="18"
                stroke="3"
                strokeLength="0.25"
                bgOpacity="0.1"
                speed="0.8"
                color="white"
              />
              <span>Changing...</span>
            </div>
          ) : (
            "Change Password"
          )}
        </Button>
      </div>
    </form>
  );
}

export default EditPasswordForm;
