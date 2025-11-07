import { HiOutlineArrowPath, HiTrash, HiUserPlus } from "react-icons/hi2";
import Button from "../../ui/Button";
import { useState } from "react";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import toast from "react-hot-toast";
import { useResendInvite } from "../../hooks/useResendInvite";
import { User } from "../../types/user";
import { BASE_URL } from "../../services/apiConfig";
import Modal from "../../ui/Modal";
import warning from "../../assets/images/warning.svg";
import { HiUserMinus } from "react-icons/hi2";
import { useDeactivateUser } from "../../hooks/useDeactivateUser";
import { useActivateUser } from "../../hooks/useActivateUser";

import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";

interface SingleUserProps {
  user: User;
}

function SingleUser({ user }: SingleUserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteUser, isPending } = useDeleteUser();
  const { mutate: resendInvite, isPending: isResending } = useResendInvite();
  const { mutate: deactivateUser, isPending: isDeactivating } =
    useDeactivateUser();
  const { mutate: activateUser, isPending: isActivating } = useActivateUser();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteConfirm = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        toast.success("User deleted successfully");
        closeModal();
      },
      onError: (error: unknown) => {
        let message = "Failed to delete user";

        if (error instanceof Error) {
          message = error.message;
        }

        toast.error(message);
        closeModal();
      },
    });
  };

  const handleResendInvite = () => {
    if (isResending) return;
    resendInvite(user.email);
  };

  const handleDactivating = () => {
    if (isDeactivating) return;
    deactivateUser(user.id);
  };
  const handleActivating = () => {
    if (isActivating) return;
    activateUser(user.id);
  };

  return (
    <>
      <div className="border border-disabledBorderGray rounded-md p-4 ">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`py-1 px-2 rounded-full flex items-center justify-center
                            ${
                              user.status === "Pending"
                                ? "bg-pendingBg text-pendingText"
                                : ""
                            }
                            ${
                              user.status === "Active"
                                ? "bg-activeBg text-activeText"
                                : ""
                            }
                            ${
                              user.status === "Inactive"
                                ? "bg-gray-100 text-gray-500"
                                : ""
                            }
                        `}
          >
            {user.status}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <Button type="small" onClick={openModal}>
                <HiTrash className="text-textGray" />
              </Button>

              <span
                className="absolute left-1/2 -translate-x-1/2 -top-8 
                   bg-gray-800 text-white text-xs rounded px-2 py-1 
                   opacity-0 group-hover:opacity-100 transition 
                   pointer-events-none whitespace-nowrap"
              >
                Delete User
              </span>
            </div>

            {user.status === "Active" && (
              <div className="relative group">
                <Button
                  type="small"
                  disabled={isDeactivating}
                  onClick={handleDactivating}
                >
                  {isDeactivating ? (
                    <Ring2
                      size="10"
                      stroke="1"
                      strokeLength="0.25"
                      bgOpacity="0.1"
                      speed="0.8"
                      color="#344054"
                    />
                  ) : (
                    <HiUserMinus className="text-textGray" />
                  )}
                </Button>

                <span
                  className="absolute left-1/2 -translate-x-1/2 -top-8 
                   bg-gray-800 text-white text-xs rounded px-2 py-1 
                   opacity-0 group-hover:opacity-100 transition 
                   pointer-events-none whitespace-nowrap"
                >
                  Deactivate user
                </span>
              </div>
            )}
            {user.status === "Inactive" && (
              <div className="relative group">
                <Button
                  type="small"
                  disabled={isActivating}
                  onClick={handleActivating}
                >
                  {isActivating ? (
                    <Ring2
                      size="10"
                      stroke="1"
                      strokeLength="0.25"
                      bgOpacity="0.1"
                      speed="0.8"
                      color="#344054"
                    />
                  ) : (
                    <HiUserPlus className="text-textGray" />
                  )}
                </Button>

                <span
                  className="absolute left-1/2 -translate-x-1/2 -top-8 
                 bg-gray-800 text-white text-xs rounded px-2 py-1 
                 opacity-0 group-hover:opacity-100 transition 
                 pointer-events-none whitespace-nowrap"
                >
                  Activate user
                </span>
              </div>
            )}

            {user.status === "Pending" && (
              <div className="relative group">
                <Button
                  type="small"
                  onClick={handleResendInvite}
                  disabled={isResending}
                >
                  {isResending ? (
                    <HiOutlineArrowPath className="animate-spin text-textGray" />
                  ) : (
                    <HiOutlineArrowPath className="text-textGray" />
                  )}
                </Button>

                <span
                  className="absolute left-1/2 -translate-x-1/2 -top-8 
                 bg-gray-800 text-white text-xs rounded px-2 py-1 
                 opacity-0 group-hover:opacity-100 transition 
                 pointer-events-none whitespace-nowrap"
                >
                  Reinvite
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 mx-auto">
          <div className="h-14 w-14 rounded-full">
            <img
              src={`${BASE_URL}/${user.profile_image_path}`}
              className="h-14 w-14 rounded-full object-cover"
              alt="Profile"
            />
          </div>
          <div className="flex gap-1">
            <span className="text-lg leading-6 text-textGray font-medium first-letter:uppercase">
              {user.name}
            </span>
            <span className="text-lg leading-6 text-textGray font-medium first-letter:uppercase">
              {user.last_name}
            </span>
          </div>
          <div className="text-lg leading-6 text-textLightGray">
            <span>{user.city?.name}</span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${user.name} ${user.last_name}?`}
        confirmText={isPending ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={closeModal}
        icon={warning}
      />
    </>
  );
}

export default SingleUser;
