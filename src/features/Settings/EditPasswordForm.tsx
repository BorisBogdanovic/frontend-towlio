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
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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
      }
    );
  };

  /////////////////////////////////////////////////////////
  const currentPassword = watch("current_password");
  const newPassword = watch("password");
  const confirmPassword = watch("password_confirmation");

  const isChangePasswordDisabled =
    !currentPassword ||
    !newPassword ||
    !confirmPassword ||
    newPassword !== confirmPassword ||
    !validatePassword(newPassword);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 w-sm mx-auto">
        <Input
          placeholder="Current Password"
          type={showCurrentPassword ? "text" : "password"}
          {...register("current_password", { required: true })}
          icon={<HiLockClosed color="#667085" size={24} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="focus:outline-none"
            >
              {showCurrentPassword ? (
                <HiEyeSlash color="#667085" size={24} />
              ) : (
                <HiEye color="#667085" size={24} />
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
        />
        <Input
          placeholder="Confirm New Password"
          type={showConfirmPassword ? "text" : "password"}
          {...register("password_confirmation", {
            required: true,
            validate: (val) =>
              val === watch("password") || "Passwords do not match",
          })}
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
        />
      </div>

      <div className="px-4 py-3 flex items-center justify-end gap-3 bg-sectionBg border-t border-disabledBorderGray mt-6">
        <div className="w-[150px]">
          <Button
            type="secondary"
            onClick={() => {
              reset();
              onSuccess();
            }}
          >
            Cancel
          </Button>
        </div>

        <div className="w-[150px]">
          <Button
            type="main"
            htmlType="submit"
            disabled={isChangePasswordDisabled}
          >
            {isChangingPassword ? (
              <div className="flex items-center gap-2">
                <Ring2
                  size="24"
                  stroke="3"
                  strokeLength="0.25"
                  bgOpacity="0.1"
                  speed="0.8"
                  color="white"
                />

                <span>...changing</span>
              </div>
            ) : (
              "Change Password"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditPasswordForm;
