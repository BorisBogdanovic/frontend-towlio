import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import { useLogout } from "../../hooks/useLogout";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { getProfileImageUrl } from "../../utils/getProfileImageUrl";

type SidebarUserInfoProps = {
  name: string;
  profile_image_path: string;
  last_name: string;
};

function SidebarUserInfo({
  name,
  last_name,
  profile_image_path,
}: SidebarUserInfoProps) {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
          <img
            src={getProfileImageUrl(profile_image_path)}
            alt="profile"
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-textGray text-sm leading-5">{name}</span>
          <span className="text-textGray text-sm leading-5">{last_name}</span>
        </div>
      </div>
      <button
        className="cursor-pointer flex items-center gap-2"
        onClick={() => logout()}
        disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? (
          <Ring2
            size="24"
            stroke="3"
            strokeLength="0.25"
            bgOpacity="0.1"
            speed="0.8"
            color="#21409a"
          />
        ) : (
          <HiArrowRightStartOnRectangle className="text-iconColor w-6 h-6" />
        )}
      </button>
    </div>
  );
}

export default SidebarUserInfo;
